import { useGoogleProfile } from "./google-hooks.ts";

export function GoogleProfile() {
  const [profile] = useGoogleProfile();

  return <div>{profile ?? "No profile"}</div>;
}

export default GoogleProfile;
