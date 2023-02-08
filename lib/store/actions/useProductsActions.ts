import api from "~/pages/api";
import { useListStore } from "../state";
import { IProduct } from "~/lib/types";
import { ChangeEvent } from "react";

const useProductsActions = () => {

    const LIST = useListStore((state) => state.LIST);
    const PRODUCTS = useListStore((state) => state.PRODUCTS);
    const SHARED_LIST_ID = useListStore((state) => state.SHARED_LIST_ID);

    const fetchProducts = () => {
        useListStore.setState({ IS_LOADING: true });
        try {
            return api.getProducts((products: IProduct[]) => {
                useListStore.setState((state) => ({ ...state, PRODUCTS: products }))
                useListStore.setState({ IS_LOADING: false });
            });
        } catch {
            console.log('Firestore Error');
        }
    }

    const addProductToList = (product: IProduct) => {

        const isProductInList = LIST.some(
            (productInList) => productInList.id === product.id
        );

        if (isProductInList) return;

        product.timestamp = new Date();

        if (SHARED_LIST_ID) {
            useListStore.setState(state => ({ ...state, IS_LIST_UPDATED: true }))
        }
        return useListStore.setState((state) => ({ ...state, LIST: LIST.concat(product) }));
    }

    const addNoteToProduct = (product: IProduct, nota: IProduct['nota']) => {
        let productToEdit = PRODUCTS.find(productList => productList.id === product.id)
        const isProductInList = LIST.some(productList => productList.id === product.id)

        if (isProductInList && productToEdit) {
            const editProduct = LIST.find(productList => productList.id === product.id)
            const productToUpdateNote = LIST.findIndex(product => product.id === editProduct?.id)
            const productWithNote = LIST[productToUpdateNote].nota = nota

            return productWithNote
        } else {
            productToEdit = { ...product, nota }
            LIST.push(productToEdit)
        }

        return LIST
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        return useListStore.setState({ SEARCH_VALUE: e.target.value });
    }

    const clearSearch = () => {
        return useListStore.setState({ SEARCH_VALUE: '' });
    }

    return {
        fetchProducts,
        addProductToList,
        addNoteToProduct,
        handleSearch,
        clearSearch
    }
}

export default useProductsActions
