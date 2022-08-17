import { useRouter } from "next/router";
import { useState } from "react";
import { useProductsActions } from "~/lib/hooks";
import { StyledModalWrapper, ModalContainer, CenterContainer } from '~/ui/styles/sharedStyles'
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
        <>
            <StyledModalWrapper>
                <ModalContainer>
                    {
                        isHome ?
                            (
                                <>
                                    <button onClick={() => closeModal()} className='close-btnHome'>
                                        <img src="/assets/close-icon.svg" alt="" />
                                    </button>
                                    <h3> Ya tenes una lista creada, <br />queres borrarla?</h3>
                                </>
                            ) :
                            <div className="clearList-wrapper">
                                <figure></figure>
                                <h3> ¿Borrar todo?</h3>
                                <button onClick={() => closeModal()} className='close-btn'>
                                    <img src="/assets/close-icon.svg" alt="" />
                                </button>
                            </div>

                    }
                    <CenterContainer>
                        <button onClick={() => handleClear()} className='modal-btn'>SI</button>
                        <button onClick={() => closeModal()} className='modal-btnCancel'>NO</button>
                    </CenterContainer>
                </ModalContainer>
            </StyledModalWrapper>
            <style jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                overflow: hidden;
                }
                
                .clearList-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 12px;
                }

                figure {
                    margin: 0;
                    width: 35px;
                }

                .clearList-wrapper .close-btn {
                    position: relative;
                    bottom: 16px;
                    right: 4px;
                }

                .clearList-wrapper h3 {
                    font-size: 22px;
                    text-align: center;
                }

                h3 {
                    font-size: 22px;
                    text-align: center;
                    margin: 8px 0 22px 0;  
                }

                .close-btnHome {
                    width: 100%;
                    text-align: right;
                    padding-right: 22px;
                }

                .modal-btn {
                    font-size: 22px;
                    font-weight: bold;
                    background-color: var(--white);
                    color: #8D8D8D;
                    width: 120px;
                    padding: 16px 0;
                    border-radius: 18px;
                    margin-bottom: 12px;
                    border: 3px solid #D2D2D2;
                }
                .modal-btnCancel {
                    font-size: 22px;
                    font-weight: bold;
                    background-color: #D2D2D2;
                    color: var(--white);
                    width: 120px;
                    padding: 16px 0;
                    border-radius: 18px;
                    margin-bottom: 12px;
                    border: 3px solid #D2D2D2;
                }
            `}</style>
        </>
    )

    return (
        <>
            <button onClick={() => { setShowModal(true) }}>{modalIcon}</button>
            {showModal ? modal : null}
        </>
    )
}

export default ClearListModal;
