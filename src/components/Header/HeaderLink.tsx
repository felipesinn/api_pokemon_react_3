import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function HeaderLink() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%"
      }}
    >
      <List sx={{ display: "flex", gap: 10 }}>
        <ListItem component={RouterLink} to="/" button>
          <ListItemText primary="Página Inicial" />
        </ListItem>
        <ListItem component={RouterLink} to="/pokedex" button>
          <ListItemText primary="Pokédex" />
        </ListItem>
      </List>
    </Box>
  );
}
