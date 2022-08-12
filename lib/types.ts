export interface IProduct {
    id: string
    name: string
    img: string
    nota: string
    categoryID: string
}

export interface State {
    products: IProduct[]
    list: IProduct[]
}

export interface Actions {
    addProduct: (product: IProduct) => void
    removeProduct: (id: IProduct['id']) => void
    addNoteToProduct: (product: IProduct, note: IProduct['nota']) => void
    clearList: () => void
}

export interface Context {
    state: State
    actions: Actions
}
