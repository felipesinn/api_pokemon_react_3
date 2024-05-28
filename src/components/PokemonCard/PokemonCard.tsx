import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  children?: React.ReactNode;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, children }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: Pokemon) => fav.id === pokemon.id));
  }, [pokemon.id]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav: Pokemon) => fav.id !== pokemon.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, pokemon])
      );
      setIsFavorite(true);
    }
  };

  return (
    <Card
      sx={{
        border: "2px solid #ffc100",
        borderRadius: "10px",
        textAlign: "center",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          height: "280px",
          objectFit: "contain",
          borderRadius: "10px 10px 52px 52px",
          backgroundColor: "#367ca5",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
          >
            {pokemon.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
          >
            #{pokemon.id}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          height="150"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
          sx={{
            objectFit: "contain",
          }}
        />
      </Box>

      <CardContent>
        {children}
        <Box sx={{ mt: 2, color: "#0a0903" }}>
          <Typography variant="body1" sx={{ mt: 0.5, fontWeight: "bold" }}>
            Abilities:
          </Typography>
          <List>
            {pokemon.abilities.map((ability, index) => (
              <ListItem key={index}>
                <ListItemText primary={ability.ability.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <IconButton onClick={handleFavoriteClick} sx={{ marginLeft: 1 }}>
          <FavoriteIcon
            sx={{ color: isFavorite ? "red" : "ActiveBorder", fontSize: 40 }}
          />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
