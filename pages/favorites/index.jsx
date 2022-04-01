import { useEffect, useState } from 'react';

import { localFavorites } from 'utils/';
import { Layout } from 'components/layouts/';
import { GridFavoritePomekons, EmptyFavorites } from 'components/pokemon';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Favorites'>
      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <GridFavoritePomekons pokemons={favorites} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
