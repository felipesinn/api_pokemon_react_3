import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  Modal,
  Slide,
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  AppBar,
  IconButton,
} from "@mui/material";
import { getPokemonList, getPokemonDetails } from "../services/api";
import { Pokemon } from '../types/pokemon';
import Pokedex from '../pages/Pokex';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const PokemonList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const itemsPerPage = 12;
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const offset = (page - 1) * itemsPerPage;
    getPokemonList(itemsPerPage, offset)
      .then(async (data) => {
        const pokemonDetailsPromises = data.map((pokemon: Pokemon) =>
          getPokemonDetails(pokemon.url)
        );
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemonList(pokemonDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os Pokémon:", error);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFavoriteClick = (pokemon: Pokemon) => {
    setFavorites([...favorites, pokemon]);
  };

  const handleRemoveFromFavorites = (pokemon: Pokemon) => {
    const updatedFavorites = favorites.filter(favorite => favorite !== pokemon);
    setFavorites(updatedFavorites);
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="inherit">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="show favorites"
            onClick={handleShowFavorites}
          >
            <p>Favoritos</p>
            <ArrowDownwardIcon />
          </IconButton>

      </AppBar>
      {showFavorites ? (
        <Pokedex favorites={favorites} removeFromFavorites={handleRemoveFromFavorites} />
      ) : (
        <>
        <p></p>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Grid>
            ) : (
              pokemonList.map((pokemon: Pokemon, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                      sx={{ mt: 1, fontWeight: "bold", textAlign: "left",  color: "#0c119b"  }}
                    >
                      ID: {pokemon.id}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="100"
                      image={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      sx={{ objectFit: 'contain', borderRadius: '5px 10px 0 0' }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        {pokemon.name}
                      </Typography>
                      <Button onClick={() => handlePokemonClick(pokemon)} variant="contained">Sobre</Button>
                      <IconButton onClick={() => handleFavoriteClick(pokemon)} sx={{ marginLeft: 1 }}>
                        <FavoriteIcon  sx={{ color: 'red', fontSize: 30 }} />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          <Pagination
            count={Math.ceil(1118 / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{ marginTop: "5em", display: "flex", justifyContent: "center" }}
          />
        </>
      )}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: 400,
                width: "80%",
                overflow: "auto",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-45%, -45%)',
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={selectedPokemon?.sprites.front_default}
                  alt={selectedPokemon?.name}
                  style={{ width: 90, height: 90, borderRadius: "20%" }}
                />
                <Typography variant="h5" sx={{ mt: 0.1 }}>
                  {selectedPokemon?.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.1 }}>
                  Height: {selectedPokemon?.height} dm
                </Typography>
                <Typography variant="body2">
                  Weight: {selectedPokemon?.weight} hg
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.1 }}>
                  Abilities:
                </Typography>
                <List>
                  {selectedPokemon?.abilities.map((ability, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={ability.ability.name} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2">Stats:</Typography>
                <List>
                  {selectedPokemon?.stats.map((stat, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${stat.stat.name}: ${stat.base_stat}`}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={stat.base_stat}
                        sx={{ width: '30%', borderRadius: '5px', marginBottom: '5px' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default PokemonList;
