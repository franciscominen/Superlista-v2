import { useState, useEffect, createContext } from "react"
import { IProduct, Context, State, Actions } from "../types"
import { useLocalStorageGet, useLocalStorageSet } from "../hooks";
import api from '~/pages/api'
import Loading from '~/ui/components/Loading'

interface Props {
    children: JSX.Element;
}

const initialState: State = {
    products: [],
    list: []
}

const ProductsContext = createContext({} as Context)

const ProductsProvider = ({ children }: Props) => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [list, setList] = useState<IProduct[]>(() => useLocalStorageGet("list", initialState.list));
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

    const addNoteToProduct = (product: IProduct, nota: IProduct['nota']) => {
        let productToEdit = products.find(productList => productList.id === product.id)
        const isProductInList = state.list.some(productList => productList.id === product.id)

        if (isProductInList && productToEdit) {
            const editProduct = state.list.find(productList => productList.id === product.id)
            const productToUpdateNote = state.list.findIndex(product => product.id === editProduct?.id)
            return list[productToUpdateNote].nota = nota
        } else {
            productToEdit = { ...product, nota }
            list.push(productToEdit)
        }
        return list
    }

    useEffect(() => {
        useLocalStorageSet("list", list);
    }, [list]);

    useEffect(() => {
        api.getAll((products: IProduct[]) => {
            setProducts(products)
            setStatus("resolved")
        });
        return () => setStatus("pending")
    }, []);

    if (status === "pending") return <Loading />;

    const state: State = { products, list }
    const actions: Actions = { addProduct, removeProduct, addNoteToProduct };

    return (
        <ProductsContext.Provider value={{ state, actions }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider as Provider, ProductsContext as default }
