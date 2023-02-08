import { useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { database } from "~/lib/firebase";
import { IProduct, ISharedList, State } from "~/lib/types";
import { useListStore } from "../state";
import api from "~/pages/api";

const useListActions = () => {

    const LIST = useListStore((state) => state.LIST);
    const SHARED_LIST_ID = useListStore((state) => state.SHARED_LIST_ID);


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const removeProduct = (id: IProduct['id']) => {
        if (SHARED_LIST_ID) {
            useListStore.setState(state => ({ ...state, IS_LIST_UPDATED: true }))
        }
        const productToRemove = LIST.filter(product => product.id !== id)
        return useListStore.setState(state => ({ ...state, LIST: productToRemove }))
    }

    const clearList = () => {
        return LIST.length ? useListStore.setState(state => ({ ...state, LIST: [] })) : LIST
    }

    const getSharedListId = (SESSION_ID: State['SESSION_ID']) => {
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

    const fetchSharedList = async (SESSION_ID: string | string[] | undefined | null) => {
        const docQuery = query(collection(database, "sharedLists"), where("listID", "==", SESSION_ID));
        const unsubscribe = onSnapshot(docQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                useListStore.setState(state => ({ ...state, LIST: doc.data()?.listProducts }))
            });
        });

        return () => unsubscribe && unsubscribe()
    }

    const updateListShared = async (listID: State['SHARED_LIST_ID']) => {
        setIsUpdate(true);
        console.log('Loading');

        try {
            await database
                .collection("sharedLists")
                .doc(listID as string | undefined)
                .update({
                    listProducts: [...LIST],
                });
            setIsUpdate(false);
            console.log('Loaded');

        } catch {
            console.log("Update Error");
        }
    };

    const deleteListShared = async (listID: State['SHARED_LIST_ID']) => {
        try {
            await database
                .collection("sharedLists")
                .doc(listID as string | undefined)
                .delete()
        } catch {
            console.log("Delete Error");
        }
    };

    return {
        removeProduct,
        clearList,
        isLoading,
        createNewListToShare,
        fetchSharedList,
        updateListShared,
        getSharedListId,
        deleteListShared,
        isUpdate
    }
}

export default useListActions;
