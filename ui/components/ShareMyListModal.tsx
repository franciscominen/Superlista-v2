import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { StyledModalWrapper, ModalContainer, CenterContainer, HomeButton, HomeText } from '~/ui/styles/sharedStyles'
import { database } from "~/lib/firebase";
import { useList } from "~/lib/hooks";
import { IProduct } from "~/lib/types";
import api from "~/pages/api";
import { timeStamp } from "console";

const ShareMyListModal = () => {
    const LIST = useList()
    const [showModal, setShowModal] = useState(false)
    const [exit, setExit] = useState(false)
    const [sharedLists, setSharedLists] = useState<IProduct[]>([])
    const router = useRouter()

    const closeModal = () => {
        setExit(true)
        setTimeout(() => {
            setShowModal(false)
            setExit(false)
        }, 400)
    }

    useEffect(() => {
        api.getSharedLists((sharedLists: IProduct[]) => {
            setSharedLists(sharedLists)
        });
    }, []);


    console.log(sharedLists);


    const shareList = async () => {
        try {
            await database.collection("sharedlist").doc().set({
                listID: '1',
                listProducts: [...LIST],
            })
        } catch {
            console.log('error');
        }
    }

    const getLastSharedList = () => {
        sharedLists
    }

    const modal = (
        <>
            <StyledModalWrapper exit={exit}>
                <ModalContainer exit={exit}>

                    <button onClick={closeModal} className='close-btnHome'>
                        <Image src="/assets/close-icon.svg" alt="X" width={28} height={28} />
                    </button>

                    <h2>Comparte tu lista!</h2>
                    <button onClick={shareList}>COMPARTIR</button>

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
            `}</style>
        </>
    )

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <Image src="/assets/share-icon.svg" alt="Share" width={42} height={42} />
            </button>
            {showModal ? modal : null}
        </>
    )
}

export default ShareMyListModal;
