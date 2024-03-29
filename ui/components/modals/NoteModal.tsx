import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import styled from "styled-components";
import { IProduct } from "~/lib/types";
import { fade } from "../../styles/animations";
import {
  StartContainer,
  StyledModalWrapper,
  ModalContainer,
  Strong,
} from "../../styles/sharedStyles";
import { getDynamicPlaceholder } from "~/lib/utils";
import useProductsActions from "~/lib/store/actions/useProductsActions";

interface Props {
  show: boolean;
  closeModal: Function;
  product: IProduct;
}

const NoteInput = styled.input`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-family: var(--principalFont);
  font-weight: 500;
  width: 100%;
  resize: none;
  border-bottom: 1px solid #c8c8c8;
  border-radius: 0;
  padding: 0 4px 4px 4px;
  margin-top: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 400;
  }
`;

const AddNoteButton = styled.button`
  position: relative;
  bottom: 2.3em;
  margin-top: 22px;
  width: 14em;
  background-color: var(--dark);
  color: var(--light);
  font-size: 20px;
  font-weight: 600;
  padding: 18px 28px;
  border-radius: 28px;
  text-align: center;
  opacity: 0;
  animation: ${fade} 0.3s ease-in 0.2s forwards;
  transition: all 0.3s;
  cursor: pointer;
`;

const NoteModal = ({ show, closeModal, product }: Props) => {
  const router = useRouter();
  const isEdit = router.pathname === "/lista/[[...slug]]";

  const { name, nota, categoryID } = product;
  const { addNoteToProduct, addProductToList } = useProductsActions();

  const [noteValue, setNoteValue] = useState<string>("");
  const [exit, setExit] = useState<boolean>(false);

  // FOCUS INPUT
  /* 
  const callbackRef = useCallback((inputElement: HTMLInputElement)  => {
    if (inputElement) {
      inputElement.focus()
    }
  }, []) */

  const toastMessage = () => {
    if (isEdit)
      return (
        <p className="toast-text">
          Editaste la nota de <Strong>{product.name}</Strong>.
        </p>
      );
    return (
      <p className="toast-text">
        Agregaste <Strong>{product.name}</Strong> a tu lista.
      </p>
    );
  };

  const showToast = () =>
    toast(toastMessage, {
      duration: 1200,
      position: "bottom-center",
      style: {
        boxShadow: "none",
        background: "#f6f6f6f0",
        border: "1px solid #D2D2D2",
        borderRadius: "20px",
        position: "relative",
        bottom: "2em",
      },
    });

  const handleAdd = () => {
    addNoteToProduct(product, noteValue);
    addProductToList(product);
    onCloseModal();
    showToast();
  };

  const onCloseModal = () => {
    setExit(true);
    setTimeout(() => {
      closeModal();
      setExit(false);
    }, 400);
  };

  const modal = (
    <>
      <StyledModalWrapper exit={exit}>
        <ModalContainer exit={exit}>
          <button onClick={onCloseModal} className="close-btn">
            <Image
              src="/assets/icons/close-icon.svg"
              alt="X"
              width={28}
              height={28}
            />
          </button>
          <div className="modal-info">
            <StartContainer>
              <Image
                src={product.img}
                alt={product.name}
                width={58}
                height={58}
              />
              <h3>{name}</h3>
            </StartContainer>
            <NoteInput
              type={"text"}
              defaultValue={nota}
              placeholder={getDynamicPlaceholder(categoryID)}
              onChange={(e) => setNoteValue(e.target.value)}
              maxLength={80}
              // ref={callbackRef}
            />
          </div>
        </ModalContainer>
        <AddNoteButton onClick={handleAdd}>
          {isEdit ? "Cambiar nota" : "Agregar a Mi Lista"}
        </AddNoteButton>
      </StyledModalWrapper>
      <style jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          overflow: hidden !important;
        }

        .close-btn {
          width: 100%;
          text-align: right;
          position: relative;
          right: 18px;
          cursor: pointer;
        }

        .modal-info {
          width: 75%;
          margin: 0 auto;
          position: relative;
          bottom: 1em;
        }

        h3 {
          font-weight: 600;
          font-size: 20px;
        }
      `}</style>
    </>
  );

  return show ? modal : null;
};

export default NoteModal;
