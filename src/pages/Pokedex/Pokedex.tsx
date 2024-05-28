import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pokemon } from "../../types/pokemon";
import { Header } from "../../components/Header/Header";
import ModalPokemon from "../../components/Modal/ModalPokemon"; // Atualize o caminho conforme necessário

export function Pokedex() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPokemon(null);
  };

  return (
    <Box>
      <Header />
      <Typography variant="h2" sx={{ mb: 5, textAlign: "center" }}>
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
                    padding: 2,
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
                <Box sx={{ mt: 2, color: "#0a0903" }}>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(pokemon)}
                      color="inherit"
                    >
                      Sobre
                    </Button>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ mt: 0.5, fontWeight: "bold" }}
                  >
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
                <IconButton onClick={() => handleRemoveFromFavorites(pokemon)}>
                  <DeleteIcon sx={{ color: "red", fontSize: 30 }} />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ModalPokemon
        open={openModal}
        onClose={handleCloseModal}
        selectedPokemon={selectedPokemon}
      />
    </Box>
  );
}
