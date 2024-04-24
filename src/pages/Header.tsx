import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Grid,
  Box,
  Modal,
  Paper,
  Slide,
  Button,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { debounce } from "lodash";

import { getPokemonList, getPokemonDetails } from "../services/api";
import fotoLogo from '../assets/pokemon-logo-png-5.png'
import { Pokemon } from '../types/pokemon'


const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const handleSearch = debounce(async () => {
      try {
        const pokemonListData = await getPokemonList(100, 0);
        const pokemonList: Pokemon[] = await Promise.all(
          pokemonListData.map(async (result: any, index: number) => {
            const pokemonData = await getPokemonDetails(result.url);
            return {
              id: index + 1,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              height: pokemonData.height,
              weight: pokemonData.weight,
              abilities: pokemonData.abilities,
              stats: pokemonData.stats,
            };
          })
        );
        const filteredList = pokemonList.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filteredList);
        setLoading(false);
        setModalOpen(true);
      } catch (error) {
        console.error("Error searching Pokémon:", error);
        setLoading(false);
      }
    }, 300);

    handleSearch();

    return () => {
      handleSearch.cancel();
    };
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const openModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={fotoLogo}
            alt="Logo"
            style={{ height: 100, marginRight: 10 }}
          />
          
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="search"
            label="Search Pokémon"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleInputChange}
            sx={{ mr: 1 }}
          />
          <IconButton disabled={loading}>
            <SearchIcon />
          </IconButton>
          {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
        </Box>
      </Toolbar>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              width: "50%",
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                p: 8,
                maxWidth: 1000,
                width: "100%",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              <Button onClick={closeModal} startIcon={<CloseIcon />}>
                Fechar
              </Button>
              <Grid container spacing={2}>
                {searchResults.map((pokemon: Pokemon, index: number) => (
                  <Grid item xs={8} sm={4} md={3} key={index}>
                    <Box
                      sx={{ textAlign: "center", cursor: "pointer" }}
                      onClick={() => openModal(pokemon)}
                    >
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: 150, height: 100, borderRadius: "50%" }}
                      />
                      <Typography variant="body1">{pokemon.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Slide>
      </Modal>
      <Modal
        open={selectedPokemon !== null}
        onClose={() => setSelectedPokemon(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Slide
          direction="up"
          in={selectedPokemon !== null}
          mountOnEnter
          unmountOnExit
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{ p: 0.1, maxWidth: 400, width: "80%", overflow: "auto" }}
            >
              <Button
                onClick={() => setSelectedPokemon(null)}
                startIcon={<CloseIcon />}
              >
                Fechar
              </Button>
              {selectedPokemon && (
                <>
                  <Box height={500} width={250} sx={{ textAlign: "center" }}>
                    <img
                      src={selectedPokemon.image}
                      alt={selectedPokemon.name}
                      style={{
                        width: 150,
                        height: 100,
                        borderRadius: "50%",
                        justifyContent: "center",
                      }}
                    />
                    <Typography variant="h5" sx={{ mt: 0.1 }}>
                      {selectedPokemon.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.1 }}>
                      Height: {selectedPokemon.height} dm
                    </Typography>
                    <Typography variant="body2">
                      Weight: {selectedPokemon.weight} hg
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.1 }}>
                      Abilities:
                    </Typography>
                    <List>
                      {selectedPokemon.abilities.map((ability, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={ability.ability.name} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="body2">Stats:</Typography>
                    <List>
                      {selectedPokemon.stats.map((stat, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${stat.stat.name}: ${stat.base_stat}`}
                          />
                          <LinearProgress
                            variant="determinate"
                            value={stat.base_stat}
                            sx={{
                              width: "50%",
                              borderRadius: "5px",
                              marginBottom: "5px",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Slide>
      </Modal>
    </AppBar>
  );
};

export default Header;