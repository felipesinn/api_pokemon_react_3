import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pokemon } from '../../types/pokemon';
import { Header } from '../../components/Header/Header';

export function Pokedex(){
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== pokemon.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div> 
<Header />
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Favoritos
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                border: "1px solid #760808",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
                sx={{ objectFit: "contain", borderRadius: "5px 10px 0 0" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {pokemon.name}
                </Typography>
                <IconButton onClick={() => handleRemoveFromFavorites(pokemon)}>
                  <DeleteIcon sx={{ color: "red", fontSize: 30 }} />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
}


