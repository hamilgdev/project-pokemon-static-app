import { FC } from 'react';
import { Card } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
  pokemonId: number;
}

export const CardFavoritePokemon: FC<Props> = ({ pokemonId }) => {
  const route = useRouter();

  const handleTransitionPokemon = () => route.push(`/pokemon/${pokemonId}`);

  return (
    <Card hoverable clickable onClick={handleTransitionPokemon}>
      <Card.Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        width={'100%'}
        height={140}
      />
    </Card>
  );
};
