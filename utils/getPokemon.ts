import { pokeApi } from "api";
import { Pokemon } from "interfaces";

export const getPokemon = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    // optimizar data necesaria
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites
    };
  } catch (error) {
    return null
  }
}