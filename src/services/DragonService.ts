const BASE_URL = 'https://pokeapi.co/api/v2'

export interface Dragon {
  name: string
  url: string
}

export interface DragonDetail {
  name: string
  id: number
  height: number
  weight: number
  types: { type: { name: string } }[]
  sprites: {
    other: {
      'official-artwork': { front_default: string }
    }
    front_default: string
  }
  stats: { base_stat: number; stat: { name: string } }[]
  abilities: { ability: { name: string } }[]
}

export async function fetchDragons(): Promise<Dragon[]> {
  const res = await fetch(`${BASE_URL}/type/dragon`)
  if (!res.ok) throw new Error('Error al cargar los dragones')
  const data = await res.json()
  return data.pokemon.map((p: { pokemon: Dragon }) => p.pokemon)
}

export async function fetchDragonDetail(name: string): Promise<DragonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`)
  if (!res.ok) throw new Error('Error al cargar el detalle del dragón')
  return res.json()
}