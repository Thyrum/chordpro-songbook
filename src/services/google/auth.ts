import { OAuth2Client } from "google-auth-library";

function getAuthenticatedClient() {
  const oAuth2Client = new OAuth2Client({
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    redirectUri: window.location.origin,
  });

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
  });
}

class GoogleAuthenticator {
  private oAuthClient;

  constructor() {
    this.oAuthClient = await getAuthenticatedClient();
  }
  authenticate() {}
}

const googleAuthenticator = new GoogleAuthenticator();
export default googleAuthenticator;
