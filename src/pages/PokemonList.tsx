import React, { useEffect, useState } from "react";

import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
} from "@mui/material";


import { getPokemonList, getPokemonDetails } from "../services/api";

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

const PokemonList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 20;

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

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          pokemonList.map((pokemon: Pokemon, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  transition: "transform 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    cursor: "pointer",
                  },
                }}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ maxWidth: "100%", borderRadius: "5px" }}
                />
                <Typography
                  variant="h6"
                  sx={{ marginTop: "0.5rem", fontWeight: "bold" }}
                >
                  {pokemon.name}
                 
                </Typography>
              </Box>
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
        sx={{ marginTop: "1em", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default PokemonList;
