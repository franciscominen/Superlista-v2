import { useRouter } from "next/router";
import { useState } from "react";
import { useProductsActions } from "~/lib/hooks";

interface Props {
    modalIcon: any
}

const ClearListModal = ({ modalIcon }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
    const isHome = router.route === '/'

    const { clearList } = useProductsActions();

    const closeModal = () => {
        return setShowModal(false)
    }

    const handleClear = () => {
        clearList()
        closeModal()
        isHome ? router.push('/products') : null
    }

    const modal = (
        <div className="modal-wrapper">
            <div className="modal-container">
                {
                    isHome ?
                        <h2> Tenes una lista creada, queres borrarla?</h2> :
                        <h2> Queres borrar esta lista?</h2>
                }
                <div>
                    <button onClick={() => handleClear()}>SI</button>
                    <button onClick={() => closeModal()}>NO</button>
                </div>
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

    return (
        <>
            <button onClick={() => { setShowModal(true) }}>{modalIcon}</button>
            {showModal ? modal : null}
        </>
    )
}

export default ClearListModal;