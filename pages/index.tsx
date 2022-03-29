import type { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { CardPokemon } from '../components/pokemon';
import { Layout } from '../components/layouts';
import { PokemonAPIResponse, ListPokemon } from '../interfaces';

import pokeApi from '../api/pokeApi';
interface Props {
  pokemons: ListPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id} xs={6} sm={3} md={2} xl={1}>
            <CardPokemon {...pokemon} />
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonAPIResponse>('/pokemon?limit=151');

  const pokemons: ListPokemon[] = data.results.map((porkemon) => {
    let id = Number(porkemon.url.split('/').slice(-2)[0]);
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    return {
      ...porkemon,
      image,
      id
    };
  });

  return {
    props: { pokemons }
  };
};
