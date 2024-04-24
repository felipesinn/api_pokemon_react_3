import React from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Pokemon } from '../types/pokemon';

interface PokedexProps {
  favorites: Pokemon[];
  removeFromFavorites: (pokemon: Pokemon) => void;
}

const Pokedex: React.FC<PokedexProps> = ({ favorites, removeFromFavorites }) => {
  const handleRemove = (pokemon: Pokemon) => {
    removeFromFavorites(pokemon);
  };

  return (
    <Box sx={{ flexGrow: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom component="div">
        Pokedex
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">Você não tem nenhum Pokémon favorito.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((pokemon: Pokemon, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemove(pokemon)}
                  sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
                >
                  <Delete />
                </IconButton>
                <CardMedia
                  component="img"
                  height="100"
                  image={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  sx={{ objectFit: 'contain', borderRadius: '5px 10px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {pokemon.name}
                  </Typography>
                  <Typography variant="body2">
                    Height: {pokemon.height} dm
                  </Typography>
                  <Typography variant="body2">
                    Weight: {pokemon.weight} hg
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Pokedex;
