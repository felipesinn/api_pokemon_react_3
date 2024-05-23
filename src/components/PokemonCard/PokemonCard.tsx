import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  children?: React.ReactNode;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, children }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((fav: Pokemon) => fav.id === pokemon.id));
    }, [pokemon.id]);
  
    const handleFavoriteClick = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (isFavorite) {
        const updatedFavorites = favorites.filter((fav: Pokemon) => fav.id !== pokemon.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        localStorage.setItem('favorites', JSON.stringify([...favorites, pokemon]));
        setIsFavorite(true);
      }
    };

  return (
    <Card
    sx={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      textAlign: "center",
      transition: "transform 0.5s ease-in-out",
      "&:hover": {
        transform: "scale(1.03)",
        cursor: "pointer",
      },
    }}
  >
    <Typography
      variant="body1"
      sx={{ mt: 1, fontWeight: "bold", textAlign: "left", color: "#0c119b" }}
    >
      ID: {pokemon.id}
    </Typography>
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
      {children}
      <IconButton onClick={handleFavoriteClick} sx={{ marginLeft: 1 }}>
          <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'ActiveBorder', fontSize: 40 }} />
        </IconButton>
    </CardContent>
  </Card>
  );
};

export default PokemonCard;
