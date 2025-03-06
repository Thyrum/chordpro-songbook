import { styled } from "@mui/joy";
import InputSongbookUpload from "../inputs/songbook-upload";
import ModeSwitcher from "../inputs/mode-switcher";
import { GoogleLogin } from "@react-oauth/google";
import GoogleAuthButton from "../google/google-auth-button";

const ToolbarContainer = styled("div")`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.background.level1};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  gap: 8px;
`;

const Spacer = styled("div")`
  flex: 1;
`;

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <InputSongbookUpload />
      <GoogleAuthButton />
      <Spacer />
      <ModeSwitcher />
    </ToolbarContainer>
  );
};

export default Toolbar;
