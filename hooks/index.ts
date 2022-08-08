import { useContext } from "react";
import ProductsContext from "@/resources/context";
import { IProduct } from "~/resources/types";


export function useProducts(): IProduct[] {
    const {
        state: { products },
    } = useContext(ProductsContext);

    return products;
}
