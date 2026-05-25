import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useFavorites } from './context/FavoritesContext'
import Home from './pages/Home'
import DragonDetail from './pages/DragonDetail'
import Favorites from './pages/Favorites'

function NavBar() {
  const { favorites } = useFavorites()
  const location = useLocation()

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-yellow-400 font-bold text-xl"> DragonDex</Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className={`text-sm ${location.pathname === '/' ? 'text-yellow-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
          Catálogo
        </Link>
        <Link to="/favorites" className={`text-sm flex items-center gap-1 ${location.pathname === '/favorites' ? 'text-yellow-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
          Favoritos
          {favorites.length > 0 && (
            <span className="bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dragon/:name" element={<DragonDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}
