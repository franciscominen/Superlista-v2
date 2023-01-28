import { create } from 'zustand'
import { State } from '../types';

export const useListStore = create<State>(() => ({
    PRODUCTS: [],
    LIST: [],
    SESSION_ID: '',
    IS_LOADING: false,
}));
