export interface IProduct {
    id: string
    name: string
    img: string
    note: string
    category: string
}

export interface State {
    products: IProduct[];
}

/* export interface Actions {
    add: (text: IProduct["text"]) => void;
    update: (todo: IProduct) => void;
    remove: (id: IProduct["id"]) => void;
}
 */
export interface Context {
    state: State;
    /* actions: Actions; */
}
