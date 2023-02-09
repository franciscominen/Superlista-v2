import { memo, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import toast from "react-hot-toast";
import { IProduct } from "~/lib/types";
import NoteModal from "../modals/NoteModal";
import { scaleInCenter } from "../../styles/animations";
import { Strong } from "~/ui/styles/sharedStyles";
import { useListStore } from "~/lib/store/state";
import useProductsActions from "~/lib/store/actions/useProductsActions";

type Props = { product: IProduct };

function ProductCard({ product }: Props) {
  const LIST = useListStore((state) => state.LIST);
  const { addProductToList } = useProductsActions();

  const [showModal, setShowModal] = useState<boolean>(false);
  const isInList = LIST.some((listProduct) => listProduct.id === product.id);

  const toastMessage = (
    <p className="toast-text">
      Agregaste <Strong>{product.name}</Strong> a tu lista.
    </p>
  );
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

  const onAddProduct = () => {
    addProductToList(product);
    showToast();
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card disabled={isInList}>
        <ButtonsContainer>
          <button
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/assets/icons/add-note-icon.svg"
              alt="Edit"
              width={18}
              height={18}
            />
          </button>
          <button onClick={() => onAddProduct()} style={{ cursor: "pointer" }}>
            <Image
              src="/assets/icons/add-icon.svg"
              alt="Add"
              width={18}
              height={18}
            />
          </button>
        </ButtonsContainer>

        <ImageWrapper>
          <Image src={product.img} alt={product.name} width={64} height={64} />
        </ImageWrapper>

        <ProductName>{product.name}</ProductName>
      </Card>
      <NoteModal show={showModal} closeModal={onCloseModal} product={product} />
    </>
  );
}

export default memo(ProductCard);

const Card = styled.div<{ disabled: boolean }>`
  position: relative;
  min-width: 60px;
  max-width: 100%;
  width: 100%;
  object-fit: cover;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-radius: 16px;
  padding: 8px 3px;
  transition: all 0.3s;
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  animation: ${scaleInCenter} 0.2s ease-in;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: "relative";
  width: 64px;
  height: 64px;
  max-height: 64px;
  max-width: 64px;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0 6px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
