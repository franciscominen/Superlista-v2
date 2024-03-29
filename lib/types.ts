import React, { ChangeEvent } from "react"

export interface IProduct {
    id: string
    name: string
    img: string | undefined | any
    nota: string
    categoryID: String
    timestamp: Date
}

export interface ISharedList {
    id: string
    listID: string | null
    listProducts: IProduct[]
}

export interface State {
    PRODUCTS: IProduct[]
    LIST: IProduct[]
    SESSION_ID: string | string[] | null | undefined
    SHARED_LIST_ID: string | string[] | null | undefined
    IS_LOADING: boolean
    SEARCH_VALUE: string
    IS_LIST_UPDATED: boolean
}

export interface Actions {
    addProductToList: (product: IProduct) => void
    removeProduct: (id: IProduct['id']) => void
    addNoteToProduct: (product: IProduct, note: IProduct['nota']) => void
    clearList: () => void
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
    clearSearch: () => void
}

export interface Utils {
    searchValue: string
    setSearchValue: (e: any) => void
    setSessionId: React.Dispatch<React.SetStateAction<string | null>>
}
export interface Context {
    state: State
    actions: Actions
    utils: Utils
}
