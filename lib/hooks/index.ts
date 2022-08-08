import { useContext } from "react";
import ProductsContext from "~/lib/context";
import { IProduct, Actions } from "~/lib/types";


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
