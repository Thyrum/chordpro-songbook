import { Google } from "@mui/icons-material";
import { TokenResponse } from "@react-oauth/google";
import { useContext } from "react";
import { GapiContext } from "./gapi-context";
import { Button, Avatar } from "@mui/material";

export type Error = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

function GoogleAuthButton() {
  const { authenticate, profile } = useContext(GapiContext);

  console.log(profile);
  return (
    <>
      <Button
        startIcon={
          profile.name ? (
            <Avatar alt={profile.name} src={profile.photo} />
          ) : (
            <Google />
          )
        }
        onClick={authenticate}
      >
        {profile.name ?? "Sync with Google"}
      </Button>
      {/* <Snackbar */}
      {/*   color="danger" */}
      {/*   autoHideDuration={5000} */}
      {/*   open={error !== undefined} */}
      {/*   onClose={() => setError(undefined)} */}
      {/*   startDecorator={<ErrorOutlined />} */}
      {/* > */}
      {/*   {error} */}
      {/* </Snackbar> */}
    </>
  );
}

export default GoogleAuthButton;
