export interface PokemonAPIResponse {
  count: number;
  next?: string;
  previous?: string;
  results: ListPokemon[];
}

export interface ListPokemon {
  name: string;
  url: string;
  image: string,
  id: number
}
