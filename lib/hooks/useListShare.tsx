import { useState } from 'react';
import { ISharedList } from '../types';

export const useSharedList = () => {
  const [sharedLists, setSharedLists] = useState<ISharedList[]>([]);
  const [lastSharedList, setLastSharedList] = useState<ISharedList[]>([]);
  const [listParam, setListParam] = useState<ISharedList['id']>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);

  const getLastSharedList = (sharedLists: any, sessionId: any) => {
    const lastSharedList = sharedLists.filter((listShared: any) => {
      return listShared.listID === sessionId;
    });
    setLastSharedList(lastSharedList);
    setListParam(lastSharedList[0]?.id);
  };

  const createNewListToShare = async (database: any, list: any, sessionId: any) => {
    setLoading(true);
    try {
      await database
        .collection('sharedLists')
        .doc()
        .set({
          listID: sessionId,
          listProducts: [...list],
        });
    } catch {
      console.log('error');
    }
    setShowLink(true);
    setLoading(false);
  };

  const updateListShared = async (database: any, list: any, sharedListId: any) => {
    setLoading(true);
    try {
      await database
        .collection('sharedLists')
        .doc(sharedListId)
        .update({
          listProducts: [...list],
        });
    } catch {
      console.log('error');
    }
    setShowLink(true);
    setLoading(false);
  };

  return {
    sharedLists,
    setSharedLists,
    lastSharedList,
    listParam,
    loading,
    showLink,
    getLastSharedList,
    createNewListToShare,
    updateListShared,
  };
};
