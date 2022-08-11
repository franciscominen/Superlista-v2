import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { useProductsActions } from "~/lib/hooks";
import { IProduct } from "~/lib/types";

interface Props {
  show: boolean
  closeModal: Function
  product: IProduct
}
const NoteModal = ({ show, closeModal, product }: Props) => {

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
    <div className="modal-wrapper">
      <div className="modal-container">
        <button onClick={() => closeModal()}>X</button>
        <img src={product.img} alt="" />
        <h1>{name}</h1>
        <textarea
          defaultValue={nota}
          placeholder="Agregue una nota al producto"
          onChange={(e) => setNoteValue(e.target.value)}
        />
        <button onClick={() => handleAdd()}>
          {isEdit ? 'Cambiar nota' : 'Agregar a mi lista'}
        </button>
      </div>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          overflow: hidden;
        }
        
        .modal-wrapper {
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
        }

        .modal-container {
          background: #f2f2f2;
          padding: 20px;
          border-radius: 20px;
          max-width: 30em;
          width: 100%;
          margin: auto;
        }
      `}</style>
    </div>
  )

  return show ? modal : null
}

export default NoteModal

const StyledModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 10;
  overflow: hidden;
  background-color: #0000007f;
`;
