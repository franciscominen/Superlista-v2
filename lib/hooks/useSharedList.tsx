const useSharedList = (
  database: any,
  SESSION_ID: string | null,
  LIST: any[]
) => {
  
  const createNewListToShare = async () => {
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
  };

  const updateListShared = async (listShared: any) => {
    try {
      await database
        .collection("sharedLists")
        .doc(listShared)
        .update({
          listProducts: [...LIST],
        });
    } catch {
      console.log("error");
    }
  };

  return {
    createNewListToShare,
    updateListShared,
  };
};

export default useSharedList;
