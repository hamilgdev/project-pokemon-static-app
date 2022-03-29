import NextLink from 'next/link';
import { Link, Spacer, Text, theme } from '@nextui-org/react';

export const Navbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: theme.colors.gray900.value
      }}
    >
      <NextLink href='/' passHref>
        <Link>
          <Text color='white' h2>
            P
          </Text>
          <Text color='white' h3>
            okémon
          </Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      <nav>
        <NextLink href='/favorites' passHref>
          <Link>
            <Text color='white'>Favoritos</Text>
          </Link>
        </NextLink>
      </nav>
    </div>
  );
};
