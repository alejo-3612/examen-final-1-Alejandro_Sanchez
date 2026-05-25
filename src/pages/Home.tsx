import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons, fetchDragonDetail } from '../services/DragonService'
import type { DragonDetail } from '../services/DragonService'

export default function Home() {
  const [dragons, setDragons] = useState<DragonDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadDragons() {
      try {
        setLoading(true)
        const list = await fetchDragons()
        const details = await Promise.all(list.slice(0, 40).map(d => fetchDragonDetail(d.name)))
        setDragons(details)
      } catch (e: any) {
        setError(e.message || 'Error al cargar dragones')
      } finally {
        setLoading(false)
      }
    }
    loadDragons()
  }, [])

  const filtered = dragons.filter(d => d.name.includes(search))
// TODO: useEffect para cargar detalle con fetchDragonDetail(name)
  // TODO: Mostrar datos completos, imagen grande, estadísticas
  // TODO: Botón de favorito

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">DragonDex</h1>
          <p className="text-gray-400">Catálogo de dragones de la PokéAPI</p>
        </div>
        <SearchBar onSearch={setSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filtered.length === 0 && <EmptyState />}
        {!loading && !error && filtered.length > 0 && <DragonList dragons={filtered} />}
      </div>
    </div>
  )
}
