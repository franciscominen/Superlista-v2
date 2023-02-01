import { useEffect, useState } from "react";
import Image from "next/image";
import { database } from "~/lib/firebase";
import { ISharedList } from "~/lib/types";
import api from "~/pages/api";
import styled from "styled-components";
import {
  StyledModalWrapper,
  ModalContainer,
  CenterContainer,
  ModalButton,
} from "~/ui/styles/sharedStyles";
import PDFDownloadButton from "../utils/PDFDownloadButton";
import showToast from "../utils/Toast";
import ShareMyListButtons from "../utils/ShareMyListButtons";

const ShareMyListModal = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(false);
  const [existsSharedList, setExistsSharedList] = useState<boolean>(false);

  const closeModal = () => {
    setExit(true);
    setTimeout(() => {
      setShowModal(false);
      setExit(false);
    }, 400);
  };

  const onCopyLink = () => {
    // const URL = process.env.NEXT_PUBLIC_URL
    navigator.clipboard.writeText(
      `https://superlista.vercel.app/lista/${listParam}`
    );
    showToast(<p className="toast-text-link">Link de la lista copiado.</p>);
  };

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
              {showLink ? (
                <CenterContainer>
                  <ModalButton onClick={onCopyLink}>COPIAR LINK</ModalButton>
                  <PDFDownloadButton />
                </CenterContainer>
              ) : (
                <ShareMyListButtons
                  loading={loading}
                  condition={existsSharedList}
                  createListFunction={createNewListToShare}
                  updateListFunction={updateListShared}
                />
              )}
            </>
          )}
        </ModalContainer>
      </StyledModalWrapper>
    </>
  );

  return (
    <>
      <OpenModalButton onClick={() => setShowModal(true)}>
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
