import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
	favorites: number[]
	addToFavorites: (productId: number) => void
	removeFromFavorites: (productId: number) => void
	isFavorite: (productId: number) => boolean
}

export const useFavorites = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			addToFavorites: (productId: number) => {
				set(state => ({
					favorites: [...state.favorites, productId],
				}))
			},
			removeFromFavorites: (productId: number) => {
				set(state => ({
					favorites: state.favorites.filter(id => id !== productId),
				}))
			},
			isFavorite: (productId: number) => {
				return get().favorites.includes(productId)
			},
		}),
		{
			name: 'favorites-storage',
		},
	),
)
