import { createContext, useContext, useState } from 'react'
import type { DragonDetail } from '../services/DragonService'

interface FavoritesContextType {
  favorites: DragonDetail[]
  addFavorite: (dragon: DragonDetail) => void
  removeFavorite: (dragonName: string) => void
  isFavorite: (dragonName: string) => boolean
}
// TODO: Implementar función addFavorite(dragon)
  // - Si el dragón ya está en favoritos, no hacer nada
  // - Agregar el dragón al array de favoritos

  // TODO: Implementar función removeFavorite(dragonName)
  // - Filtrar el dragón del array por nombre

  // TODO: Implementar función isFavorite(dragonName)
  // - Retornar true si el dragón ya está en favoritos

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<DragonDetail[]>([])

  function addFavorite(dragon: DragonDetail) {
    if (isFavorite(dragon.name)) return
    setFavorites(prev => [...prev, dragon])
  }

  function removeFavorite(dragonName: string) {
    setFavorites(prev => prev.filter(d => d.name !== dragonName))
  }

  function isFavorite(dragonName: string) {
    return favorites.some(d => d.name === dragonName)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return context
}
