import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import type { DragonDetail } from '../services/DragonService'
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function DragonCard({ dragon }: { dragon: DragonDetail }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(dragon.name)
  const image = dragon.sprites?.other?.['official-artwork']?.front_default || dragon.sprites?.front_default

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault()
    fav ? removeFavorite(dragon.name) : addFavorite(dragon)
  }
    // TODO: Mostrar imagen, nombre, tipo, botón de favorito


  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-yellow-400 transition overflow-hidden">
      <Link to={`/dragon/${dragon.name}`}>
        <div className="relative">
          {image && <img src={image} alt={dragon.name} className="w-full h-40 object-contain bg-gray-900 p-2" />}
          <button
            onClick={toggleFav}
            className="absolute top-2 right-2 text-yellow-400 text-xl"
          >
            {fav ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        <div className="p-3">
          <h2 className="text-white font-semibold capitalize text-lg">{dragon.name}</h2>
          <div className="flex gap-1 mt-1 flex-wrap">
            {dragon.types?.map(t => (
              <span key={t.type.name} className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
