import { styled } from "@mui/system";
import { AppBar, Box } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
background-image: linear-gradient(to right, black, #555, #333);
`

export const Logo = styled("img")`
  height: 80px;
  margin-right: 20px;
`;

export const SearchBox = styled(Box)`
  display: flex;
  align-items: center;
`;