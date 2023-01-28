import api from "~/pages/api";
import { useListStore } from "../state";
import { IProduct } from "~/lib/types";

const useProductsActions = () => {

    const LIST = useListStore((state) => state.LIST);
    const PRODUCTS = useListStore((state) => state.PRODUCTS);

    const fetchProducts = () => {
        useListStore.setState({ IS_LOADING: true });
        try {
            return api.getAll((products: IProduct[]) => {
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
        return useListStore.setState((state) => ({ ...state, LIST: LIST.concat(product) }));
    }

    const addNoteToProduct = (product: IProduct, nota: IProduct['nota']) => {
        let productToEdit = PRODUCTS.find(productList => productList.id === product.id)
        const isProductInList = LIST.some(productList => productList.id === product.id)

        if (isProductInList && productToEdit) {
            const editProduct = LIST.find(productList => productList.id === product.id)
            const productToUpdateNote = LIST.findIndex(product => product.id === editProduct?.id)
            const productWithNote = LIST[productToUpdateNote].nota = nota
            // useLocalStorageSet("list", list)

            return productWithNote
        } else {
            productToEdit = { ...product, nota }
            LIST.push(productToEdit)
        }

        // useLocalStorageSet("list", list)
        return LIST
    }

    return {
        fetchProducts,
        addProductToList,
        addNoteToProduct
    }
}

export default useProductsActions
