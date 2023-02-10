import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    StyledModalWrapper,
    ModalContainer,
    CenterContainer,
    HomeButton,
    HomeText,
    Strong
} from '~/ui/styles/sharedStyles'
import useListActions from "~/lib/store/actions/useListActions";
import { useListStore } from "~/lib/store/state";

const ClearListModal = () => {
    const [showModal, setShowModal] = useState(false)
    const [exit, setExit] = useState(false)
    const router = useRouter()

    const { clearList } = useListActions()

    const closeModal = () => {
        setExit(true)
        setTimeout(() => {
            setShowModal(false)
            setExit(false)
        }, 400)
    }

    const handleClear = () => {
        clearList()
        useListStore.setState((state) => ({ ...state, SESSION_ID: null }));
        useListStore.setState((state) => ({ ...state, SHARED_LIST_ID: null }));
        useListStore.setState((state) => ({ ...state, IS_LIST_UPDATED: false }));
        window.localStorage.setItem("PDFList", '');
        closeModal()
        router.replace('/productos')
    }

    const modal = (
        <>
            <StyledModalWrapper exit={exit}>
                <ModalContainer exit={exit}>
                    <>
                        <button onClick={closeModal} className='close-btnHome'>
                            <Image src="/assets/icons/close-icon.svg" alt="X" width={28} height={28} />
                        </button>
                        <h3>
                            Tenes una lista creada.<br />
                            <Strong>¿Querés borrarla?</Strong>
                        </h3>
                    </>
                    <CenterContainer>
                        <button onClick={handleClear} className='modal-btn'>SÍ</button>
                        <button onClick={closeModal} className='modal-btnCancel'>NO</button>
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
                    font-weight: 400; 
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
                    border: 1px solid #D2D2D2;
                }
                .modal-btnCancel {
                    font-size: 22px;
                    font-weight: bold;
                    background-color: #D2D2D2;
                    color: var(--darkgrey);
                    width: 120px;
                    padding: 16px 0;
                    border-radius: 18px;
                    margin-bottom: 12px;
                    border: 1px solid #D2D2D2;
                }
            `}</style>
        </>
    )

    return (
        <>
            <HomeButton onClick={() => setShowModal(true)}>
                <Image
                    src="/assets/icons/new-list-btn.svg"
                    alt='+'
                    width={78}
                    height={78}
                />
                <HomeText><strong>Crear nueva</strong> Lista</HomeText>
            </HomeButton>
            {showModal ? modal : null}
        </>
    )
}

export default ClearListModal;
