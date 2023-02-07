import { database } from "~/lib/firebase"
import { IProduct, ISharedList, State } from "~/lib/types"

export default {
    getProducts: (callback: (products: IProduct[]) => void) =>
        database
            .collection('products')
            .onSnapshot(snapshot => callback(
                snapshot.docs
                    .sort((a, b) => 0.5 - Math.random())
                    .map(doc => ({ ...(doc.data() as IProduct), id: doc.id }))
            )),
    getSharedLists: (queryParam: State['SESSION_ID'], callback: (sharedList: ISharedList[]) => IProduct[]) =>
        database
            .collection('sharedLists')
            .where('listID', '==', queryParam)
            .onSnapshot(snapshot => callback(
                snapshot.docs
                    .map(doc => ({ id: doc.id, listID: doc.data().listID, listProducts: doc.data().listProducts }))
            )),
}

export const categoriesData = [
    {
        id: 1,
        title: "Bebidas",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fbebidas.svg?alt=media&token=39385af9-4ed3-430d-bbdc-3198a6f50860",
        link: "bebidas",
        categoryColor: "/assets/categories-colors/bebidas-color.svg",
        colorCode: '#FFAD93'
    },
    {
        id: 2,
        title: "Carnes",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fcarnes.svg?alt=media&token=78fedf62-abce-4a17-a0f3-55accac623de",
        link: "carnes",
        categoryColor: "/assets/categories-colors/carnes-color.svg",
        colorCode: '#FFCDCD'
    },
    {
        id: 3,
        title: "Higiene",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fcosmetica.svg?alt=media&token=0edc262e-cff3-4599-a07a-ea8ee63f818e",
        link: "cosmetica",
        categoryColor: "/assets/categories-colors/higiene-color.svg",
        colorCode: '#E8E8E8'
    },
    {
        id: 4,
        title: "Despensa",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fdespensa.svg?alt=media&token=41ad394f-7e3b-463e-8eca-56473eb2d469",
        link: "despensa",
        categoryColor: "/assets/categories-colors/almacen-color.svg",
        colorCode: '#E4FFA9'
    },
    {
        id: 5,
        title: "Junk-Food",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fjunkfood.svg?alt=media&token=99b14d4b-112f-452f-aae5-b82735784ad1",
        link: "junk-food",
        categoryColor: "/assets/categories-colors/junkfood-color.svg",
        colorCode: '#D4A9FF'
    },
    {
        id: 6,
        title: "Lácteos",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Flacteos.svg?alt=media&token=21cc8ad9-fa65-436c-bc1b-5ea9b2f2a213",
        link: "lacteos",
        categoryColor: "/assets/categories-colors/lacteos-color.svg",
        colorCode: '#A9FFF5'
    },
    {
        id: 7,
        title: "Limpieza",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Flimpieza.svg?alt=media&token=2f7d2b84-4458-49fa-b17d-5f049b15f172",
        link: "limpieza",
        categoryColor: "/assets/categories-colors/limpieza-color.svg",
        colorCode: '#A9DBFF'
    },
    {
        id: 8,
        title: "Panadería",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fpanaderia.svg?alt=media&token=e2f346af-364a-430a-b0b6-45d43a64169a",
        link: "panaderia",
        categoryColor: "/assets/categories-colors/panaderia-color.svg",
        colorCode: '#FFECBB'
    },
    {
        id: 9,
        title: "Pastas",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fpastas.svg?alt=media&token=04f72b4f-c8c6-4a29-9949-e66e586115fc",
        link: "pastas",
        categoryColor: "/assets/categories-colors/pastas-color.svg",
        colorCode: '#FFFCAA'
    },
    {
        id: 10,
        title: "Verdulería",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fverduras.svg?alt=media&token=74e159fc-501c-48b7-9177-a60a1cef0ce9",
        link: "verduleria",
        categoryColor: "/assets/categories-colors/verduleria-color.svg",
        colorCode: '#ABFFA9'
    },
]
