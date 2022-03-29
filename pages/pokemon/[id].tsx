import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import pokeApi from 'api/pokeApi';
import { Pokemon } from 'interfaces';
import { Layout } from 'components/layouts/Layout';
import Image from 'next/image';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title='Pokemon'>
      <Grid.Container css={{ padding: '8px' }}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ margin: '8px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-imagen.png'
                }
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button color='gradient' ghost>
                Guardar en favorito
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container
                css={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const dataStaticPokemon: string[] = [...Array(151)].map(
    (value, index) => `${index + 1}`
  );

  return {
    paths: dataStaticPokemon.map((id) => ({
      params: { id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: { ...data }
    }
  };
};
