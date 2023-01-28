import { IProduct } from "~/lib/types";
import { useListStore } from "../state";

const useListActions = () => {
    const LIST = useListStore((state) => state.LIST);

    const removeProduct = (id: IProduct['id']) => {
        const productToRemove = LIST.filter(product => product.id !== id)
        return useListStore.setState(state => ({ ...state, LIST: productToRemove }))
    }

    const clearList = () => {
        return LIST.length ? useListStore.setState(state => ({ ...state, LIST: [] })) : LIST
    }

    return {
        removeProduct,
        clearList
    }
}

export default useListActions;