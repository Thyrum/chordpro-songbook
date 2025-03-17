import { googleConfig } from "../../services/google-config";
import { AuthMethodKey, User } from "./auth.model";
import { IAuth } from "./i-auth";

type TokenResponse = google.accounts.oauth2.TokenResponse;

// See https://developers.google.com/drive/api/quickstart/js
export class AuthGoogle implements IAuth {
  public type: AuthMethodKey = "GOOGLE";
  private instance: google.accounts.oauth2.TokenClient | undefined;
  private access_token: string | undefined;
  private user: User | undefined;

  private resolveSignIn: undefined | ((user: User | void) => void);
  private rejectSignIn: undefined | ((error: TokenResponse) => void);

  constructor() {
    console.log("Starting auth google");
    this.initialize();
  }

  private initialize() {
    this.instance = google.accounts.oauth2.initTokenClient({
      ...googleConfig,
      callback: (resp) => {
        if (resp.error !== undefined) {
          this.onFailure(resp);
        } else {
          this.onSuccess(resp);
        }
      },
    });
  }

  public async signIn(): Promise<User | void> {
    console.log("signIn google");
    if (!this.instance) this.initialize();
    const result = new Promise<User | void>((resolve, reject) => {
      this.resolveSignIn = resolve;
      this.rejectSignIn = reject;
    });
    this.instance?.requestAccessToken();
    return result;
  }

  public async signOut() {
    if (this.access_token !== undefined) {
      await new Promise<void>((resolve) =>
        google.accounts.oauth2.revoke(this.access_token!, () => resolve()),
      );
      this.access_token = undefined;
    }
    this.resolveSignIn = undefined;
    this.rejectSignIn = undefined;
  }

  private onFailure(error: TokenResponse) {
    // TODO: Improve failure logging
    alert(JSON.stringify(error));
    if (this.rejectSignIn !== undefined) {
      this.rejectSignIn(error);
    }
  }

  public async isAuthenticated() {
    return this.access_token !== undefined;
  }

  public async getUser() {
    return this.user;
  }

  private async onSuccess(response: TokenResponse) {
    this.access_token = response.access_token;
    await new Promise((resolve) => gapi.load("client", resolve));
    gapi.client.setToken({ access_token: this.access_token });
    await gapi.client.load(
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    );
    const request = await gapi.client.drive.about.get({
      fields: "user/photoLink,user/displayName,user/emailAddress",
    });
    const user = request.result.user;
    if (user) {
      this.user = {
        email: user.emailAddress!,
        photo: user.photoLink,
        username: user.displayName!,
      };
    }
    if (this.resolveSignIn !== undefined) {
      this.resolveSignIn(this.user);
    }
  }
}
