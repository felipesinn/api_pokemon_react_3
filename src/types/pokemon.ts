export interface Pokemon {
  name: string;
  image: string;
  url: string;
  id: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }, base_stat: number }[];
}
export interface PokemonDetail {
  name: string;
  id: string;
  image: string;
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
}
