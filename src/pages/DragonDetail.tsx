import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragonDetail } from '../services/DragonService'
import type { DragonDetail as DragonDetailType } from '../services/DragonService'
import { useFavorites } from '../context/FavoritesContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function DragonDetail() {
  const { name } = useParams<{ name: string }>()
  const [dragon, setDragon] = useState<DragonDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchDragonDetail(name!)
        setDragon(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [name])

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><Loader /></div>
  if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><ErrorMessage message={error} /></div>
  if (!dragon) return null
  // TODO: useEffect para cargar detalle con fetchDragonDetail(name)
  // TODO: Mostrar datos completos, imagen grande, estadísticas
  // TODO: Botón de favorito


  const image = dragon.sprites?.other?.['official-artwork']?.front_default || dragon.sprites?.front_default
  const fav = isFavorite(dragon.name)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-yellow-400 hover:underline mb-6 inline-block">← Volver al catálogo</Link>

        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
          <div className="bg-gray-900 flex justify-center p-6 relative">
            {image && <img src={image} alt={dragon.name} className="h-52 object-contain" />}
            <button
              className="absolute top-4 right-4 text-yellow-400 text-2xl"
            >
              {fav ? <FaStar /> : <FaRegStar />}
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold capitalize">{dragon.name}</h1>
              <span className="text-gray-400 text-lg">#{String(dragon.id).padStart(3, '0')}</span>
            </div>

            <div className="flex gap-2 mb-6">
              {dragon.types.map(t => (
                <span key={t.type.name} className="bg-yellow-500 text-black px-3 py-1 rounded-full capitalize font-semibold text-sm">
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-sm">Altura</p>
                <p className="text-white font-bold text-xl">{dragon.height / 10} m</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-sm">Peso</p>
                <p className="text-white font-bold text-xl">{dragon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-yellow-400 font-semibold mb-3">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {dragon.abilities.map(a => (
                  <span key={a.ability.name} className="bg-gray-700 px-3 py-1 rounded-full capitalize text-sm">
                    {a.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-yellow-400 font-semibold mb-3">Estadísticas</h2>
              {dragon.stats.map(s => (
                <div key={s.stat.name} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-300">{s.stat.name}</span>
                    <span className="text-white font-bold">{s.base_stat}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${Math.min(s.base_stat / 255 * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


