import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { State } from '../types'

export const useListStore = create<State>()(
    persist(
        (set, get) => ({
            PRODUCTS: [],
            LIST: [],
            SESSION_ID: null,
            SHARED_LIST_ID: null,
            IS_LOADING: false,
            SEARCH_VALUE: '',
        }),
        {
            name: 'list-storage',
            partialize: (state) => ({ LIST: state.LIST, SESSION_ID: state.SESSION_ID, SHARED_LIST_ID: state.SHARED_LIST_ID }),
        }
    )
)
