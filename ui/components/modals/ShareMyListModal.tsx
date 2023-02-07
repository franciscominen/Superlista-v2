import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  StyledModalWrapper,
  ModalContainer,
  CenterContainer,
  ModalButton,
} from "~/ui/styles/sharedStyles";
import SmallLoader from "../utils/SmallLoader";
import PDFDownloadButton from "../utils/PDFDownloadButton";
import showToast from "../utils/Toast";
import useListActions from "~/lib/store/actions/useListActions";
import { useListStore } from "~/lib/store/state";
import { v4 as uuid } from "uuid";
// import { database } from "~/lib/firebase";
// import { database } from "~/lib/firebase";

const ShareMyListModal = () => {
  const LIST = useListStore((state) => state.LIST);
  const SESSION_ID = useListStore((state) => state.SESSION_ID);
  const SHARED_LIST_ID = useListStore((state) => state.SHARED_LIST_ID);

  const {
    createNewListToShare,
    isLoading,
    updateListShared,
    fetchSharedList,
    getSharedListId,
  } = useListActions();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setExit(true);
    setTimeout(() => {
      setShowModal(false);
      setExit(false);
    }, 400);
  };

  const onShareMyList = async () => {
    const randomId = uuid().slice(0, 8);
    createNewListToShare(randomId);
    fetchSharedList(randomId);
    getSharedListId(randomId);
  };

  const onCopyLink = () => {
    // const URL = process.env.NEXT_PUBLIC_URL
    navigator.clipboard.writeText(`http://localhost:3000/lista/${SESSION_ID}`);
    showToast(<p className="toast-text-link">Link de la lista copiado.</p>);
  };

  useEffect(() => {
    if (!LIST.length) {
      useListStore.setState((state) => ({ ...state, SESSION_ID: null }));
      useListStore.setState((state) => ({ ...state, SHARED_LIST_ID: null }));
    }
    /* 
    if (SESSION_ID) {
      updateListShared(SHARED_LIST_ID);
    } */
  }, [LIST]);

  const updateList = () => {
    if (SESSION_ID) {
      return updateListShared(SHARED_LIST_ID);
    }
  };

/*   const deleteColl = () => {
    database
      .collection("sharedLists")
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  }; */

  const modal = (
    <>
      <StyledModalWrapper exit={exit}>
        <ModalContainer exit={exit}>
          <CloseModalImg onClick={closeModal}>
            <Image
              src="/assets/icons/close-icon.svg"
              alt="X"
              width={26}
              height={26}
            />
          </CloseModalImg>
          {!LIST.length ? (
            <>
              <ModalText>
                Agregá al menos un elemento <br />
                para compartir tu lista.
              </ModalText>
              <CenterContainer>
                <ModalButton onClick={closeModal}>OKEY</ModalButton>
              </CenterContainer>
            </>
          ) : (
            <>
              <ModalText>Comparti tu Lista!</ModalText>
              {SESSION_ID ? (
                <CenterContainer>
                  <ModalButton onClick={onCopyLink}>COPIAR LINK</ModalButton>
                  <PDFDownloadButton />
                  <ModalButton onClick={updateList}>Actualizar</ModalButton>
                </CenterContainer>
              ) : isLoading ? (
                <SmallLoader />
              ) : (
                <ModalButton onClick={onShareMyList}>Compartir</ModalButton>
              )}
            </>
          )}
        </ModalContainer>
      </StyledModalWrapper>
    </>
  );

  return (
    <>
      <OpenModalButton onClick={openModal}>
        <Image
          src="/assets/icons/share-icon.svg"
          alt="Share"
          width={42}
          height={42}
        />
      </OpenModalButton>
      {showModal ? modal : null}
    </>
  );
};

export default ShareMyListModal;

const OpenModalButton = styled.button`
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const CloseModalImg = styled.button`
  display: block;
  margin-left: auto;
  padding-right: 24px;
  cursor: pointer;
`;

const ModalText = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 8px 0 16px 0;
`;
