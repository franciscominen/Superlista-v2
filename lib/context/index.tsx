import { useState, useEffect, createContext, ChangeEvent } from "react";
import { IProduct, Context, State, Actions, Utils } from "../types";
import { useLocalStorageGet, useLocalStorageSet } from "../hooks";
import api from "~/pages/api";
import Loading from "~/ui/components/utils/Loading";
import { useRouter } from "next/router";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { database } from "../firebase";

interface Props {
  children: JSX.Element;
}

const initialState: State = {
  products: [],
  list: [],
  sessionId: null,
};

const ProductsContext = createContext({} as Context);

const ProductsProvider = ({ children }: Props) => {
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [list, setList] = useState<IProduct[]>(() =>
    useLocalStorageGet("list", initialState.list)
  );
  const [sessionId, setSessionId] = useState<State["sessionId"]>(() =>
    useLocalStorageGet("sessionId", initialState.sessionId)
  );
  const [status, setStatus] = useState<"pending" | "resolved" | "rejected">(
    "pending"
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const addProduct = (product: IProduct) => {
    if (!state.list.length) {
      const getSessionId = uuid().slice(0, 8);
      setSessionId(getSessionId);
    }

    const isProductInList = state.list.some(
      (productInList) => productInList.id === product.id
    );
    if (isProductInList) return;
    product.timestamp = new Date();
    setList((list) => list.concat(product));
  };

  const removeProduct = (id: IProduct["id"]) => {
    const productToRemove = state.list.filter((product) => product.id !== id);
    return setList(productToRemove);
  };

  const clearList = () => {
    return list.length ? setList([]) : list;
  };

  const addNoteToProduct = (product: IProduct, nota: IProduct["nota"]) => {
    let productToEdit = products.find(
      (productList) => productList.id === product.id
    );
    const isProductInList = state.list.some(
      (productList) => productList.id === product.id
    );

    if (isProductInList && productToEdit) {
      const editProduct = state.list.find(
        (productList) => productList.id === product.id
      );
      const productToUpdateNote = state.list.findIndex(
        (product) => product.id === editProduct?.id
      );
      const productWithNote = (list[productToUpdateNote].nota = nota);
      useLocalStorageSet("list", list);

      return productWithNote;
    } else {
      productToEdit = { ...product, nota };
      list.push(productToEdit);
    }

    useLocalStorageSet("list", list);
    return list;
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const fetchSharedList = async (query: string | string[]) => {
    const docRef = doc(database, "sharedLists", `${query}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      onSnapshot(docRef, (snapshot) => {
        setList(snapshot.data()?.listProducts);
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    useLocalStorageSet("sessionId", sessionId);
  }, [sessionId]);

  useEffect(() => {
    useLocalStorageSet("list", list);
  }, [list]);

  useEffect(() => {
    if (router.query.slug) {
      console.log("Traigo lista compartida");

      fetchSharedList(router.query.slug);
    }
    api.getAll((products: IProduct[]) => {
      setProducts(products);
      setStatus("resolved");
    });
    return () => setStatus("pending");
  }, []);

  if (status === "pending") return <Loading />;

  const state: State = {
    products,
    list,
    sessionId,
  };

  const actions: Actions = {
    addProduct,
    removeProduct,
    addNoteToProduct,
    clearList,
    handleSearch,
    clearSearch,
    fetchSharedList
  };
  const utils: Utils = {
    searchValue,
    setSearchValue,
    setSessionId,
  };

  return (
    <ProductsContext.Provider value={{ state, actions, utils }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider as Provider, ProductsContext as default };
