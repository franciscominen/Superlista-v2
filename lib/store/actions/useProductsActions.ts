import api from "~/pages/api";
import { useListStore } from "../state";
import { IProduct } from "~/lib/types";

const useProductsActions = () => {

    const LIST = useListStore((state) => state.LIST);

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
        useListStore.setState((state) => ({ ...state, LIST: LIST.concat(product) }));
        console.log(LIST);
        
    }

    return {
        fetchProducts,
        addProductToList
    }
}

export default useProductsActions
