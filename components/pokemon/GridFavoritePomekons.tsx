import { FC } from 'react';
import { Grid } from '@nextui-org/react';

import { CardFavoritePokemon } from './CardFavoritePokemon';

interface Props {
  pokemons: number[];
}

export const GridFavoritePomekons: FC<Props> = ({ pokemons }) => {
  console.log(pokemons);

  return (
    <Grid.Container gap={2} direction='row'>
      {pokemons.map((id) => (
        <Grid key={id} xs={6} sm={3} md={2} xl={1}>
          <CardFavoritePokemon pokemonId={id} />
        </Grid>
      ))}
    </Grid.Container>
  );
};
