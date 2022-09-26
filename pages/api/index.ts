import { database } from "~/lib/firebase"
import { IProduct } from "~/lib/types"

export default {
    getAll: (callback: (products: IProduct[]) => void) =>
        database
            .collection('products')
            .onSnapshot(snapshot => callback(
                snapshot.docs.sort((a, b) => 0.5 - Math.random()).map(doc => ({ id: doc.id, ...(doc.data() as IProduct) }))
            )),
}

export const categoriesData = [
    {
        id: 1,
        title: "Bebidas",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fbebidas.svg?alt=media&token=39385af9-4ed3-430d-bbdc-3198a6f50860",
        link: "bebidas",
    },
    {
        id: 2,
        title: "Carnes",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fcarnes.svg?alt=media&token=78fedf62-abce-4a17-a0f3-55accac623de",
        link: "carnes",
    },
    {
        id: 3,
        title: "Cosmética",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fcosmetica.svg?alt=media&token=0edc262e-cff3-4599-a07a-ea8ee63f818e",
        link: "cosmetica",
    },
    {
        id: 4,
        title: "Despensa",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fdespensa.svg?alt=media&token=41ad394f-7e3b-463e-8eca-56473eb2d469",
        link: "despensa",
    },
    {
        id: 5,
        title: "Junk-Food",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fjunkfood.svg?alt=media&token=99b14d4b-112f-452f-aae5-b82735784ad1",
        link: "junk-food",
    },
    {
        id: 6,
        title: "Lácteos",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Flacteos.svg?alt=media&token=21cc8ad9-fa65-436c-bc1b-5ea9b2f2a213",
        link: "lacteos",
    },
    {
        id: 7,
        title: "Limpieza",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Flimpieza.svg?alt=media&token=2f7d2b84-4458-49fa-b17d-5f049b15f172",
        link: "limpieza",
    },
    {
        id: 8,
        title: "Panadería",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fpanaderia.svg?alt=media&token=e2f346af-364a-430a-b0b6-45d43a64169a",
        link: "panaderia",
    },
    {
        id: 9,
        title: "Pastas",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fpastas.svg?alt=media&token=04f72b4f-c8c6-4a29-9949-e66e586115fc",
        link: "pastas",
    },
    {
        id: 10,
        title: "Verdulería",
        img: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2Fcategorias-static%2Fverduras.svg?alt=media&token=74e159fc-501c-48b7-9177-a60a1cef0ce9",
        link: "verduleria",
    },
]
