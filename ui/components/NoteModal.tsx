import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { useProductsActions } from "~/lib/hooks";
import { IProduct } from "~/lib/types";
import { CenterContainer } from "../styles/sharedStyles";

interface Props {
  show: boolean
  closeModal: Function
  product: IProduct
}
const NoteModal = ({ show, closeModal, product }: Props) => {
  8

  const { name, nota } = product;

  const { addNoteToProduct, addProduct } = useProductsActions()
  const [noteValue, setNoteValue] = useState<string>('')
  const router = useRouter()
  const isEdit = router.asPath === '/mylist'

  const handleAdd = () => {
    addNoteToProduct(product, noteValue)
    addProduct(product)
    closeModal()
  }

  const modal = (
    <>
      <StyledModalWrapper>
        <ModalContainer>
          <button onClick={() => closeModal()} className='close-btn'>
            <img src="/assets/close-icon.svg" alt="X" />
          </button>
          <div className="modal-info">
            <CenterContainer>
              <img src={product.img} alt="" className="product-img" />
              <h3>{name}</h3>
            </CenterContainer>
            <NoteTextArea
              rows={1}
              defaultValue={nota}
              placeholder="Agregue una nota al producto"
              onChange={(e) => setNoteValue(e.target.value)}
            />
          </div>
        </ModalContainer>
        <AddNoteButton onClick={() => handleAdd()}>
          {isEdit ? 'Cambiar nota' : 'Agregar a Mi lista'}
        </AddNoteButton>
      </StyledModalWrapper>
      <style jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          overflow: hidden!important;
        }

        .close-btn {
          width: 100%;
          text-align: right;
          position: relative;
          right: 18px;
        }

        .modal-info {
          width: 75%;
          margin: 0 auto;
          position: relative;
          bottom: 1em;
        }

        .product-img {
          min-width: 38px;
          margin-right: 4px;
        }

        h3 {
          font-size: 20px;
        }
      `}</style>
    </>
  )

  return show ? modal : null
}

export default NoteModal

const StyledModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #00000055;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden!important;
`;

const ModalContainer = styled.div`
  background: #f2f2f2;
  padding: 22px 0 12px 0;
  border-radius: 40px;
  max-width: 30em;
  width: 90%;
  margin: 0 auto;
`
const NoteTextArea = styled.textarea`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-family: var(--principalFont);
  width: 100%;
  resize: none;
  border-bottom: 1px solid #c8c8c8;
  padding: 0 4px 8px 4px;
  margin-top: 12px;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: bold;
  }
`

const AddNoteButton = styled.button`
  margin-top: 22px;
  width: 60%;
  background-color: var(--dark);
  color: var(--light);
  font-size: 18px;
  font-weight: bold;
  padding: 18px 28px;
  border-radius: 28px;
`