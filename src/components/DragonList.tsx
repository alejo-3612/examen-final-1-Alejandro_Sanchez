import DragonCard from './DragonCard'
import type { DragonDetail } from '../services/DragonService'

export default function DragonList({ dragons }: { dragons: DragonDetail[] }) {
    // TODO: Renderizar lista de DragonCard

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {dragons.map(dragon => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
    </div>
  )
}
