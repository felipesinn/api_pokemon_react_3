import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getPokemonList, getPokemonDetails } from "../../services/api";
import { Pokemon } from "../../types/pokemon";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import ModalPokemon from "../../components/Modal/ModalPokemon";
import { Header } from "../../components/Header/Header";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const itemsPerPage = isMobile ? 6 : 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * itemsPerPage;
        const data = await getPokemonList(itemsPerPage, offset);
        const pokemonDetails = await Promise.all(
          data.map((pokemon: any) => getPokemonDetails(pokemon.url))
        );
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [page, itemsPerPage]);

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

  return (
    <div>
      <Header />
      <Grid>
        <Box sx={{ flexGrow: 2, p: 2 }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}></Typography>
          <Grid container spacing={2}>
            {loading ? (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              pokemonList.map((pokemon, index) => (
                <Grid item xs={12} sm={6} md={4} lg={isMobile ? 6 : 4} key={index}>
                  <PokemonCard pokemon={pokemon}>
                    <Button
                      variant="contained"
                      onClick={() => handlePokemonClick(pokemon)}
                      color="inherit"
                    >
                      Sobre
                    </Button>
                  </PokemonCard>
                </Grid>
              ))
            )}
          </Grid>

          <Pagination
            count={Math.ceil(1118 / itemsPerPage)}
            page={page}
            color="primary"
            onChange={handlePageChange}
            size="large"
            sx={{ marginTop: "2em", display: "flex", justifyContent: "center" }}
          />
          <ModalPokemon
            open={modalOpen}
            onClose={handleCloseModal}
            selectedPokemon={selectedPokemon}
          />
        </Box>
      </Grid>
    </div>
  );
};
