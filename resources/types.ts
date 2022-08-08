export interface IProduct {
    id: string
    name: string
    img: string
    note: string
    category: string
}

export interface State {
    products: IProduct[];
    list: IProduct[];
}

export interface Actions {
    addProduct: (product: IProduct) => void;
    removeProduct: (id: IProduct['id']) => void;
}

export interface Context {
    state: State;
    actions: Actions;
}
