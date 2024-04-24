// store/pokemonSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/pokemon';
import { getPokemonList, getPokemonDetails } from '../../services/api';

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async () => {
    const response = await getPokemonList(20, 0);
    return response.results;
  }
);

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (pokemonUrl: string) => {
    const response = await getPokemonDetails(pokemonUrl);
    return response;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemon list';
      })
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const pokemonIndex = state.pokemons.findIndex(
          (pokemon) => pokemon.url === action.payload.url
        );
        if (pokemonIndex !== -1) {
          state.pokemons[pokemonIndex] = action.payload;
        }
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemon details';
      });
  },
});

export default pokemonSlice.reducer;
