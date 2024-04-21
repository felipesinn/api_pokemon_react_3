import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Pokemon {
    name: string;
    url: string;
    id:string;
  }

  interface PokemonState {
    data: Pokemon[] | null
    loading:boolean
    error: string | null

}


const initialState: PokemonState = {
    data: null,
    loading: false,
    error: null,
};

const extractPokemonId = (url: string): string => {
    try {
        const parsedUrl = new URL(url);
        const id = parsedUrl.pathname.split('/').filter(Boolean).pop();
        if (id) {
            return id;
        }
    } catch (error) {
        console.error('Erro ao extrair o ID do Pokémon:', error);
    }
    return '';
};


const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemonLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setPokemonSuccess: (state, action: PayloadAction<Pokemon[]>) => {
            state.loading = false;
            state.data = action.payload.map(pokemon => ({
                ...pokemon,
                isPokedex:false,
                id: extractPokemonId(pokemon.url)
            }));
        },
        setPokemonError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { setPokemonLoading, setPokemonSuccess, setPokemonError } = pokemonSlice.actions;

export default pokemonSlice.reducer;