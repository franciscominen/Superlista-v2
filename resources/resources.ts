
import { database } from "../firebase/client";

import { IProduct } from "./types";

export default {
    getAll: (callback: (todos: IProduct[]) => void) =>
        database
        .collection('products')
        .onSnapshot(snapshot => callback(
            snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as IProduct) }))
        )),
}
