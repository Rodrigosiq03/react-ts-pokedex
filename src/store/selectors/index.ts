import { selector } from "recoil";

// api
import { requester } from "../../api/requester";
import { IPokemon, IPokemonFetch } from "../../interfaces";

// recoil: atoms
import { atomPokemonFetch, atomPokemonOffset, atomPokemonSearch } from "../atoms";
import { atomHashPokemonsFetch, atomHashPokemonsList } from "../hashs";

export const selectorFetchPokemon = selector<IPokemonFetch[]>({
  key: 'selectorFetchPokemon',
  get: async ({ get }) => {
    get(atomHashPokemonsFetch)
    const offset = get(atomPokemonOffset);

    const { data } = await requester({
      baseURL: "https://pokeapi.co/api/v2",
    }).get(`/pokemon?limit=15&offset=${offset}`);

    return data.results;
  },
});

export const selectorGetPokemons = selector({
  key: 'selectorGetPokemons',
  get: async ({ get }) => {
    get(atomHashPokemonsList)
    const pokemonFetch = get(atomPokemonFetch);

    if (pokemonFetch.length > 0) {
      const list = pokemonFetch.map((pokemon: IPokemonFetch) => pokemon.name);

      const result = list.map(async (pokemon) => { 
          const { data } = await requester({
          baseURL: "https://pokeapi.co/api/v2", 
        }).get(`/pokemon/${pokemon.toLowerCase().trim()}`)
    
        return data
      })

      const pokemonsList = await Promise.all(result)

      return pokemonsList
    }
  }
})
export const selectorGetPokemon = selector<IPokemon>({
  key: 'selectorGetPokemon',
  get: async ({ get }) => {
    const pokemon = get(atomPokemonSearch);

    if (pokemon) {
      const { data } = await requester({
        baseURL: "https://pokeapi.co/api/v2", 
      }).get(`/pokemon/${pokemon.toLowerCase().trim()}`)
  
      return data
    }
  }
})