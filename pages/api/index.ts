import { database } from "~/lib/firebase"
import { IProduct } from "~/lib/types"

export default {
    getAll: (callback: (products: IProduct[]) => void) =>
        database
            .collection('products')
            .onSnapshot(snapshot => callback(
                snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as IProduct) }))
            )),
}
