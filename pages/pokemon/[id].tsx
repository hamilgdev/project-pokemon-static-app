import { useEffect, useState } from 'react';

import Image from 'next/image';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import pokeApi from 'api/pokeApi';
import { Pokemon, PokemonAPIResponse } from 'interfaces';
import { localFavorites, getPokemon } from 'utils';
import { Layout } from 'components/layouts';
interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsFavorite(!isFavorite);

    if (isFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  };

  useEffect(() => {
    setIsFavorite(localFavorites.verifyLocalFavorite(pokemon.id));
  }, [pokemon.id]);

  return (
    <Layout title={`Pokemon - ${pokemon.name}`}>
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
              <Button
                color='gradient'
                ghost={!isFavorite}
                onClick={handleFavorites}
              >
                {!isFavorite ? 'Guardar en favorito' : 'Quitar de favorito'}
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
  // const { data } = await pokeApi.get<PokemonAPIResponse>('/pokemon?limit=151');
  // cuando el [id], era utilizado para crear las páginas estáticas
  const dataStaticPokemon: string[] = [...Array(151)].map(
    (value, index) => `${index + 1}`
  );
  // cuando el [name], era utilizado para crear las páginas estáticas
  // const dataStaticPokemon = data.results.map((pokemon): any => pokemon.name);

  return {
    paths: dataStaticPokemon.map((id) => ({
      params: { id }
    })),
    // fallback: false
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemon(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      pokemon
    }
  };
};
