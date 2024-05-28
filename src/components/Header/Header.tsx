import { Toolbar, Box, Divider } from "@mui/material";
import fotoLogo from "../../assets/pokemon-logo-png-5.png";
import { StyledAppBar, Logo } from "./HeaderStyles";
import { HeaderLink } from "../Header/HeaderLink"

export function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo src={fotoLogo} alt="Logo" />
        </Box>
        <HeaderLink />
      </Toolbar>
      <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", height: "1px", width: 1 }} />
      {/* <HeaderLink /> */}
    </StyledAppBar>
  );
}
