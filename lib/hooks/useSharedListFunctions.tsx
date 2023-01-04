import { useState } from "react";
import { ISharedList } from "../types";

const useSharedListFunctions = (
  database: any,
  SESSION_ID: string | null,
  LIST: any[]
) => {
  const [sharedLists, setSharedLists] = useState<ISharedList[]>([]);
  const [lastSharedList, setLastSharedList] = useState<ISharedList[]>([]);
  const [listParam, setListParam] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLastSharedList = () => {
    const lastSharedList = sharedLists.filter((listShared: ISharedList) => {
      return listShared.listID === SESSION_ID;
    });
    setLastSharedList(lastSharedList);
    setListParam(lastSharedList[0]?.id);
  };

  const createNewListToShare = async () => {
    setLoading(true);
    try {
      await database
        .collection("sharedLists")
        .doc()
        .set({
          listID: SESSION_ID,
          listProducts: [...LIST],
        });
    } catch {
      console.log("error");
    }
    setShowLink(true);
    setLoading(false);
  };

  const updateListShared = async () => {
    setLoading(true);
    try {
      await database
        .collection("sharedLists")
        .doc(lastSharedList[0]?.id)
        .update({
          listProducts: [...LIST],
        });
    } catch {
      console.log("error");
    }
    setShowLink(true);
    setLoading(false);
  };

  return {
    sharedLists,
    lastSharedList,
    listParam,
    showLink,
    loading,
    getLastSharedList,
    createNewListToShare,
    updateListShared,
    setSharedLists,
    setListParam,
    setShowLink,
  };
};

export default useSharedListFunctions;
