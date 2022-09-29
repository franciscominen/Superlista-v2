import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { StyledModalWrapper, ModalContainer } from '~/ui/styles/sharedStyles'
import { database } from "~/lib/firebase"
import { useList, useSessionId } from "~/lib/hooks"
import { ISharedList } from "~/lib/types"
import api from "~/pages/api"

const ShareMyListModal = () => {
    const LIST = useList()
    const SESSION_ID = useSessionId()
    const [showModal, setShowModal] = useState(false)
    const [exit, setExit] = useState(false)
    const [sharedLists, setSharedLists] = useState<ISharedList[]>([])
    const [lastSharedList, setLastSharedList] = useState<ISharedList[]>([])
    const [listParam, setListParam] = useState<ISharedList['id']>('')
    const [loading, setLoading] = useState(false)
    const [showLink, setShowLink] = useState(false)
    const router = useRouter()

    const closeModal = () => {
        setExit(true)
        setTimeout(() => {
            setShowModal(false)
            setExit(false)
        }, 400)
    }

    useEffect(() => {
        api.getSharedLists((sharedLists: ISharedList[]) => {
            setSharedLists(sharedLists)
        });
    }, []);

    useEffect(() => {
        const lastSharedList = sharedLists.filter((listShared) => {
            return listShared.listID === SESSION_ID
        })
        setLastSharedList(lastSharedList)
    }, [sharedLists])

    useEffect(() => {
        setListParam(lastSharedList[0]?.id)

        /* console.log('listID:', lastSharedList[0]?.listID, 'SESSION_ID:', SESSION_ID);
        
        if (lastSharedList[0]?.listID === SESSION_ID) {
            setShowLink(true)
        } */
    }, [lastSharedList])

    const createNewListToShare = async () => {
        setLoading(true)
        try {
            await database.collection("sharedLists").doc().set({
                listID: SESSION_ID,
                listProducts: [...LIST],
            })
        } catch {
            console.log('error');
        }
        setLoading(false)
        setShowLink(true)
    }

    const shareButton = <>{loading ? <p>Cargando...</p> : <button onClick={createNewListToShare}>COMPARTIR</button>}</>

    const modal = (
        <>
            <StyledModalWrapper exit={exit}>
                <ModalContainer exit={exit}>
                    <button onClick={closeModal} className='close-btnHome'>
                        <Image src="/assets/close-icon.svg" alt="X" width={28} height={28} />
                    </button>
                    {!LIST.length ?
                        <>
                            <p>Debes agregar al menos un elemento para compartir tu lista.</p>
                            <button>OK</button>
                        </> :
                        <>
                            <h1>Comparte Tu Lista!</h1>
                            {showLink ? <button onClick={() => { navigator.clipboard.writeText(listParam) }}
                            >COPIAR LINK</button> : shareButton}
                        </>
                    }
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
