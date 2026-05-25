export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
        // TODO: Implementar input controlado que llame a onSearch
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar dragón..."
        onChange={e => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-yellow-400 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  )
}


  