import { ErrorOutlined, Google } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/joy";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useGoogleCredentials } from "./google-hooks";

export type Error = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

function GoogleAuthButton() {
  const [credentials, setCredentials] = useGoogleCredentials();
  const [error, setError] = useState<string | undefined>(undefined);

  const onError = (error: Error) => {
    console.log(error);
    if (error.error_description !== undefined) {
      setError(error.error_description);
    } else {
      setError("Something went wrong authenticating with Google!");
    }
  };

  const login = useGoogleLogin({
    onSuccess: setCredentials,
    onError,
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.appdata",
  });

  return (
    <>
      <Button startDecorator={<Google />} onClick={() => login()}>
        Sync with Google
      </Button>
      <Snackbar
        color="danger"
        autoHideDuration={5000}
        open={error !== undefined}
        onClose={() => setError(undefined)}
        startDecorator={<ErrorOutlined />}
      >
        {error}
      </Snackbar>
    </>
  );
}

export default GoogleAuthButton;
