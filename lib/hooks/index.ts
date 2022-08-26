import { useContext } from "react";
import ProductsContext from "~/lib/context";
import { IProduct, Actions, Utils } from "~/lib/types";


export function useProducts(): IProduct[] {
    const { state: { products } } = useContext(ProductsContext);
    return products;
}

export function useList(): IProduct[] {
    const { state: { list } } = useContext(ProductsContext);
    return list;
}

export function useProductsActions(): Actions {
    const { actions } = useContext(ProductsContext);
    return actions;
}

export function useUtils(): Utils {
    const { utils } = useContext(ProductsContext);
    return utils;
}

export function useLocalStorageSet(key: string, value: any) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e)
    }
}

export function useLocalStorageGet(key: string, initialValue: any) {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    } catch (e) {
        return initialValue;
    }
}