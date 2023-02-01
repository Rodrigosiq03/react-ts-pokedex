import styled from 'styled-components';
import { TPokemonType } from '../../interfaces';
import { FlexBox } from '../Flexbox';

interface TAtomPokemonType {
  type: TPokemonType;
}

export const Container = styled(FlexBox)`
  max-width: 225px;
  background-color: ${({ theme }) => theme.colors.neutral.pure};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 10px;
  max-height: 340px;
`;

export const PokemonSpot = styled(FlexBox)<TAtomPokemonType>`
  background-color: ${(props => props?.theme?.colors?.types?.[props?.type])};
  border-radius: 100%;
  width: 170px;
  height: 170px;
`

export const PokemonSprite = styled.img`
  height: 200px;
  width: 200px;
`;

export const PokemonText = styled.span<TAtomPokemonType>`
  color: ${(props => props?.theme?.colors?.types?.[props?.type])};
  font-size: 1.25rem;
  font-weight: bold;
`