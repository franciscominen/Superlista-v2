import { useState } from "react";
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
import { scaleInCenter } from "~/ui/styles/animations";

const ShareMyListModal = () => {
  const LIST = useListStore((state) => state.LIST);
  const SESSION_ID = useListStore((state) => state.SESSION_ID);

  const { createNewListToShare, isLoading, fetchSharedList, getSharedListId } =
    useListActions();

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
    getSharedListId(randomId);
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(`https://superlista.vercel.app/lista/${SESSION_ID}`);
    showToast(<p className="toast-text-link">Link de la lista copiado.</p>);
    fetchSharedList(SESSION_ID);
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
                  <ShareButton onClick={onCopyLink}>
                    <Image
                      src="/assets/icons/link-icon.svg"
                      alt="Copy Link"
                      height={32}
                      width={32}
                      style={{ position: "relative", top: "2px" }}
                    />
                  </ShareButton>
                  <ShareButtonA
                    href="whatsapp://send?text=This is WhatsApp sharing example using link"
                    data-action="share/whatsapp/share"
                    target="_blank"
                    className="wsp-btn"
                  >
                    <Image
                      src="/assets/icons/wsp-icon.svg"
                      alt="Copy Link"
                      height={30}
                      width={30}
                    />
                  </ShareButtonA>
                  <PDFDownloadButton />
                </CenterContainer>
              ) : isLoading ? (
                <SmallLoader />
              ) : (
                <CenterContainer>
                  <ModalButton onClick={onShareMyList}>COMPARTIR</ModalButton>
                </CenterContainer>
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
  margin: 8px 0 20px 0;
`;

const ShareButton = styled.button`
  background: var(--white);
  border-radius: 0 15px 15px 15px;
  border: 2px solid var(--gray);
  width: 60px;
  height: 60px;
  margin: 0 6px;
  cursor: pointer;
  animation: ${scaleInCenter} 0.3s ease both;
`;

const ShareButtonA = styled.a`
  background: var(--white);
  border-radius: 0 15px 15px 15px;
  border: 2px solid var(--gray);
  width: 60px;
  height: 60px;
  display: none;
  margin: 0 6px;
  animation: ${scaleInCenter} 0.3s ease both;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
