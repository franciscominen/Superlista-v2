import { useState, useEffect, createContext } from "react"
import { IProduct, Context, State } from "./types"
import api from "./resources"
import Loading from '@/components/loading'

interface Props {
    children: JSX.Element;
}

const ProductsContext = createContext({} as Context)

const ProductsProvider = ({ children }: Props) => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [status, setStatus] = useState<"pending" | "resolved" | "rejected">("pending")

    useEffect(() => {
        api.getAll((products: IProduct[]) => {
            setProducts(products)
            setStatus("resolved")
        });

        return () => setStatus("pending")
    }, []);

    if (status === "pending") return <Loading />;

    const state: State = { products }

    return <ProductsContext.Provider value={ { state } }> { children } </ProductsContext.Provider>
}

export { ProductsProvider as Provider, ProductsContext as default }
