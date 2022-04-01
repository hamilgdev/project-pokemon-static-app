import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Row, Text } from '@nextui-org/react';

import { ListPokemon } from 'interfaces/pokemon-list';

export const CardPokemon: FC<ListPokemon> = ({ id, name, image }) => {
  const router = useRouter();

  const handleTransitionPokemon = () => router.push(`/pokemon/${id}`);

  return (
    <Card hoverable clickable onClick={handleTransitionPokemon}>
      <Card.Body css={{ p: 1 }}>
        <Card.Image src={image} width='100%' height={140} />
      </Card.Body>
      <Card.Footer>
        <Row justify='space-between'>
          <Text transform='capitalize'>{name}</Text>
          <Text>#{id}</Text>
        </Row>
      </Card.Footer>
    </Card>
  );
};
