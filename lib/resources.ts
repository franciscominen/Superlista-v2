/* import { database } from "./firebase"
import { IProduct } from "./types"

export default {
    add: (list: IProduct) =>
        database
            .collection("users")
            .doc(user)
            .collection("todos")
            .add(todo),
    update: (user: IUser["uid"], todo: ITodo) =>
        database
            .collection("users")
            .doc(user)
            .collection("todos")
            .doc(todo.id)
            .update(todo)
} */