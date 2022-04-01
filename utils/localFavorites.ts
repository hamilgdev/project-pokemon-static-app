const toggleFavorites = (id: number): void => {

  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (favorites.includes(id)) {
    favorites = favorites.filter(pokeId => pokeId !== id)
  } else {
    favorites.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const verifyLocalFavorite = (id: number): boolean => {

  // evita el error cuando se ejecuta localStora en la carga inicial desde el backend (error de servidor)
  // if (typeof window === 'undefined') return false

  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

  return favorites.includes(id)
}

const pokemons = (): string[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}

export default { toggleFavorites, verifyLocalFavorite, pokemons }