import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function HeaderLink() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%",
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      <List sx={{ display: "flex", gap: 4 }}>
        <ListItem 
          component={RouterLink} 
          to="/" 
          sx={{ 
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '5.2rem', 
            '&:hover': {
              color: '#ffeb3b',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ListItemText primary="Início" />
        </ListItem>
        <ListItem 
          component={RouterLink} 
          to="/pokedex" 
          sx={{ 
            textDecoration: 'none',
            color: '#ffffff',
            '&:hover': {
              color: '#ffeb3b',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ListItemText primary="Pokédex" />
        </ListItem>
      </List>
    </Box>
  );
}
