import { Toolbar, TextField, Box, Divider } from "@mui/material";
import fotoLogo from "../../assets/pokemon-logo-png-5.png";
import { StyledAppBar, Logo, SearchBox } from "./HeaderStyles";
import { HeaderLink } from "../Header/HeaderLink"

export function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo src={fotoLogo} alt="Logo" />
        </Box>
        <SearchBox>
          <TextField
            id="search"
            label="Search Pokémon"
            variant="outlined"
            size="small"
          />
        </SearchBox>
      </Toolbar>
      <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", height: "1px", width: 1 }} />
      <HeaderLink />
    </StyledAppBar>
  );
}
