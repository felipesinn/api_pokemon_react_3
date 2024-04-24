// pokemonModalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../types/pokemon';

interface PokemonModalState {
  open: boolean;
  selectedPokemon: Pokemon | null;
}

const initialState: PokemonModalState = {
  open: false,
  selectedPokemon: null,
};

export const pokemonModalSlice = createSlice({
  name: 'pokemonModal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Pokemon>) => {
      state.open = true;
      state.selectedPokemon = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.selectedPokemon = null;
    },
  },
});

export const { openModal, closeModal } = pokemonModalSlice.actions;

export default pokemonModalSlice.reducer;
