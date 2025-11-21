import { GOOGLE_AUTH_CLIENT_ID } from "@/env-config";

export const googleConfig = {
  client_id: GOOGLE_AUTH_CLIENT_ID,
  scope: "https://www.googleapis.com/auth/drive.appdata",
  // Callback is defined later
} as google.accounts.oauth2.TokenClientConfig;
