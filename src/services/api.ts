import axios from 'axios';

export const getPokemonList = async (limit: number, offset: number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonDetailsById = async (id: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  };