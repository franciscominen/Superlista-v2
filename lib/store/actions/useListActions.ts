import { useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "~/lib/firebase";
import { IProduct, State } from "~/lib/types";
import { useListStore } from "../state";
import api from "~/pages/api";

const useListActions = () => {

    const LIST = useListStore((state) => state.LIST);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const removeProduct = (id: IProduct['id']) => {
        const productToRemove = LIST.filter(product => product.id !== id)
        return useListStore.setState(state => ({ ...state, LIST: productToRemove }))
    }

    const clearList = () => {
        return LIST.length ? useListStore.setState(state => ({ ...state, LIST: [] })) : LIST
    }

    const getSharedListId = (SESSION_ID: any) => {
        try {
            return api.getSharedLists(SESSION_ID, (sharedList: ISharedList[]) => {
                const sharedListID = sharedList.map(list => { return list.id });
                return useListStore.setState((state) => ({ ...state, SHARED_LIST_ID: sharedListID[0] }))
            });
        } catch {
            console.log('Firestore Error');
        }
    }

    const createNewListToShare = async (SESSION_ID: State['SESSION_ID']) => {
        setIsLoading(true);
        try {
            await database
                .collection("sharedLists")
                .doc()
                .set({
                    listID: SESSION_ID,
                    listProducts: [...LIST],
                });
            useListStore.setState(state => ({ ...state, SESSION_ID }));
            setIsLoading(false);

        } catch {
            console.log("error");
        }
    };

    const fetchSharedList = async (queryParam: string | string[] | null | undefined) => {
        const docRef = doc(database, "sharedLists", `${queryParam}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            onSnapshot(docRef, (snapshot) => {
                useListStore.setState(state => ({ ...state, LIST: snapshot.data()?.listProducts }))
            });
        } else {
            console.log("No such document!");
        }
    }

    const updateListShared = async (SHARED_LIST_ID: State['SHARED_LIST_ID']) => {
        setIsLoading(true);
        try {
            await database
                .collection("sharedLists")
                .doc(SHARED_LIST_ID as string | undefined)
                .update({
                    listProducts: [...LIST],
                });
            setIsLoading(false);
        } catch {
            console.log("Update Error");
        }
    };

    return {
        removeProduct,
        clearList,
        isLoading,
        createNewListToShare,
        fetchSharedList,
        updateListShared,
        getSharedListId
    }
}

export default useListActions;
