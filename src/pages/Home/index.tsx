import { useEffect, useState, useMemo, useCallback } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import Card from "../../components/Card";
import { Container } from "../../components/Container";
import { FlexBox } from "../../components/Flexbox";

// recoil: atoms
import { atomPokemonFetch, atomPokemonList, atomPokemonOffset, atomPokemonSearch } from "../../store/atoms";
import { atomHashPokemonsFetch, atomHashPokemonsList } from "../../store/hashs";

// recoil: selectors
import { selectorFetchPokemon, selectorGetPokemon, selectorGetPokemons } from "../../store/selectors";

const HomePage = () => {
  // local: States
  const [searchPokemon, setSearchPokemon] = useState('')

  // recoil: States
  const [pokemon, setPokemon] = useRecoilState(atomPokemonSearch)
  const [fetchPokemons, setFetchPokemons] = useRecoilState(atomPokemonFetch)
  const [pokemonsOffset, setPokemonsOffset] = useRecoilState(atomPokemonOffset)
  const [pokemonsList, setPokemonsList] = useRecoilState(atomPokemonList)
  const [hashFetchMorePokemons, setHashFetchMorePokemons] = useRecoilState(atomHashPokemonsFetch)
  const [hashPokemonsList, setHashPokemonsList] = useRecoilState(atomHashPokemonsList)


  // recoil: loadable
  const getLoadablePokemons = useRecoilValueLoadable(selectorGetPokemons)
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon)
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemon)

  // memo: states
  const disabledFetchMorePokemons = useMemo(() => {
    if (
      fetchLoadablePokemon.state === 'hasError' ||
      fetchLoadablePokemon.state === 'loading' ||
      getLoadablePokemons.state === 'hasError' ||
      getLoadablePokemons.state === 'loading'
    ) {
      return true
    } else {
      return false
    }

  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

  const hasFetchPokemonsError = useMemo(() => {
    if (
      fetchLoadablePokemon.state === 'hasError' ||
      getLoadablePokemons.state === 'hasError'
    ) {
      return true
    } else {
      return false
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

  const retryFetchMorePokemon = useCallback(() => {
    if (fetchLoadablePokemon.state === 'hasError') {
      return setHashFetchMorePokemons(hashFetchMorePokemons + 1)
    } if (getLoadablePokemons.state === 'hasError') {
      return setHashPokemonsList(hashPokemonsList + 1)
    }

  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

  useEffect(() => {
    if (
      fetchLoadablePokemon.state === 'hasValue' && 
      fetchLoadablePokemon.contents !== undefined
    ) {
      setFetchPokemons(fetchLoadablePokemon.contents)
    }
  }, [fetchLoadablePokemon.state, fetchLoadablePokemon.contents])

  useEffect(() => {
    if (
      getLoadablePokemons.state === 'hasValue' && 
      getLoadablePokemons.contents !== undefined
    ) {
      if (pokemonsList.length > 0) {
        setPokemonsList(pokemonsList.concat(getLoadablePokemons.contents))
      } else {
        setPokemonsList(getLoadablePokemons.contents)
      }
    }
    
  }, [getLoadablePokemons.state, getLoadablePokemons.contents])

  return (
    <Container>
      <FlexBox align="flex-start" justify="center" direction="column" gap="xxs" >
        <input type={'text'} onChange={(event) => setSearchPokemon(event.target.value)} />
        <button onClick={() => setPokemon(searchPokemon)} >Procurar</button>
        <FlexBox align="flex-start" justify="center" direction="column" gap="xxs" >
          {getLoadablePokemon?.state === 'loading' && <div>Loading...</div>}
          {getLoadablePokemon?.state === 'hasValue' && 
            getLoadablePokemon?.contents !== undefined && (
              <Card 
                type={getLoadablePokemon?.contents?.types[0]?.type?.name}
                id={getLoadablePokemon.contents.id}
                preview={
                  getLoadablePokemon?.contents?.sprites?.versions?.[
                    "generation-v"]?.["black-white"]?.animated?.front_default || ''}
                image={ getLoadablePokemon?.contents?.sprites?.other?.dream_world?.front_default  || getLoadablePokemon?.contents.sprites.other?.["official-artwork"]?.front_default || '' }
                name={getLoadablePokemon?.contents?.name}
              />
            )}

        </FlexBox>
        <FlexBox align="flex-start" justify="center" direction="row" gap="xxs" wrap="wrap" >
          { pokemonsList.map((pokemon) => (
            <Card 
            type={pokemon.types[0]?.type?.name}
            id={pokemon.id}
            preview={
              pokemon.sprites?.versions?.[
                "generation-v"]?.["black-white"]?.animated?.front_default || ''}
            image={ pokemon.sprites?.other?.dream_world?.front_default  || getLoadablePokemon?.contents.sprites.other?.["official-artwork"]?.front_default || '' }
            name={pokemon.name}
          />
          )) }
        </FlexBox>

      </FlexBox>
        <button disabled={ disabledFetchMorePokemons } onClick={() => setPokemonsOffset(pokemonsOffset + 15)} >Carregar mais</button>

        { hasFetchPokemonsError && (
          <button disabled={ disabledFetchMorePokemons } onClick={() => retryFetchMorePokemon()} >Tente Novamente</button>
        )}
    </Container>
  )
}

export default HomePage;