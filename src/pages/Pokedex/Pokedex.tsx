import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pokemon } from "../../types/pokemon";
import { Header } from "../../components/Header/Header";

export function Pokedex() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Box>
      <div>
        <Header />
      </div>
      <Typography
        variant="h2"
        sx={{
          mb: 5,
          textAlign: "center",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Favoritos
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                  objectFit: "contain",
                  borderRadius: "10px 10px 58px 58px",
                  backgroundColor: "#ffc100",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {pokemon.name} (ID: {pokemon.id})
                  </Typography>
                  <CardMedia
                    component="img"
                    height="150"
                    image={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    sx={{
                      objectFit: "contain",
                      borderRadius: "10px 10px 58px 58px",
                      backgroundColor: "#ffc100",
                    }}
                  />
                </Box>
              </Box>
              <CardContent>
                <IconButton onClick={() => handleRemoveFromFavorites(pokemon)}>
                  <DeleteIcon sx={{ color: "red", fontSize: 30 }} />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
