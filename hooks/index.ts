import { useContext } from "react";
import ProductsContext from "@/resources/context";
import { IProduct, Actions } from "~/resources/types";


export function useProducts(): IProduct[] {
    const {
        state: { products },
    } = useContext(ProductsContext);

    return products;
}

export function useList(): IProduct[] {
    const {
        state: { list },
    } = useContext(ProductsContext);

    return list;
}

export function useProductsActions(): Actions {
    const { actions } = useContext(ProductsContext);
    return actions;
}
