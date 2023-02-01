import { atom } from 'recoil';
import { IPokemon, IPokemonFetch } from '../../interfaces';

export const atomPokemonSearch = atom<string | undefined>({
  key: 'atomPokemonSearch',
  default: undefined
})

export const atomPokemonFetch = atom<IPokemonFetch[]>({
  key: 'atomPokemonFetch',
  default: [],
})

export const atomPokemonOffset = atom<number>({
  key: 'atomPokemonOffset',
  default: 0,
})

export const atomPokemonList = atom<IPokemon[]>({
  key: 'atomPokemonList',
  default: [],
})