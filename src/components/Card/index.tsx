import { FC } from "react";
import { TPokemonType } from "../../interfaces";
import { FlexBox } from "../Flexbox";

import * as Atom from './atoms'

interface ICardProps {
  name: string,
  image: string,
  preview?: string,
  id: number,
  type: TPokemonType,
}

const Card: FC<ICardProps> = ({ name, image, preview, id, type }) => {
  return (
    <Atom.Container
      gap="xs"
      align="center"
      justify="flex-start"
      direction="column"
    >
      <FlexBox 
        align="center"
        justify="flex-end"
        direction="row">
        <Atom.PokemonText type={type} >#{ id }</Atom.PokemonText>
      </FlexBox>
      <Atom.PokemonSpot
        type={type}
        align="center"
        justify="center"
        direction="column"
        >
        <Atom.PokemonSprite src={ image } alt={`Pokemon: ${ name }`} />
      </Atom.PokemonSpot>
      <FlexBox
        align="center"
        justify="space-between"
        direction="row"
      > <Atom.PokemonText type={type} >{ name }</Atom.PokemonText>
        { preview && (<img src={ preview } alt="" />)}

      </FlexBox>  
    </Atom.Container>
  )
}

export default Card;