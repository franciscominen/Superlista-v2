import { useState, useEffect, createContext } from "react"
import { IProduct, Context, State, Actions } from "../types"
import api from '~/pages/api'
import Loading from '~/ui/components/loading'

interface Props {
    children: JSX.Element;
}

const ProductsContext = createContext({} as Context)

const ProductsProvider = ({ children }: Props) => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [list, setList] = useState<IProduct[]>([]);
    const [status, setStatus] = useState<"pending" | "resolved" | "rejected">("pending")


    const addProduct = (newProduct: IProduct) => {
        const isProductInList = state.list.some(
            (product) => product.id === newProduct.id
        );

        isProductInList ?
            setList([...state.list]) :
            setList([...state.list, { ...newProduct }])

        return list
    }

    const removeProduct = (id: IProduct['id']) => {
        const productToRemove = state.list.filter(product => product.id !== id)
        setList(productToRemove)
        return list
    }

    useEffect(() => {
        api.getAll((products: IProduct[]) => {
            setProducts(products)
            setStatus("resolved")
        });
        return () => setStatus("pending")
    }, []);

    if (status === "pending") return <Loading />;

    const state: State = { products, list }
    const actions: Actions = { addProduct, removeProduct };

    return <ProductsContext.Provider value={{ state, actions }}> {children} </ProductsContext.Provider>
}

export { ProductsProvider as Provider, ProductsContext as default }
