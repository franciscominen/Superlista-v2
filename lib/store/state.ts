import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { State } from '../types'

export const useListStore = create<State>()(
    persist(
        (set, get) => ({
            PRODUCTS: [],
            LIST: [],
            SESSION_ID: '',
            IS_LOADING: false,
            SEARCH_VALUE: '',
        }),
        {
            name: 'list-storage',
            partialize: (state) => ({ LIST: state.LIST }),
        }
    )
)
