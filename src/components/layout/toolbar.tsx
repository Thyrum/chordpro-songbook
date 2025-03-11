import InputSongbookUpload from "../inputs/songbook-upload";
import ModeSwitcher from "../inputs/mode-switcher";
import GoogleAuthButton from "../google/google-auth-button";
import { styled } from "@mui/material";

const ToolbarContainer = styled("div")`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
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
