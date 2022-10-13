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
    products: IProduct[]
    list: IProduct[]
    sessionId: string | null
}

export interface Actions {
    addProduct: (product: IProduct) => void
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
