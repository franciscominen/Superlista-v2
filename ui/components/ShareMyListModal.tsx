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
    const [showModal, setShowModal] = useState<boolean>(false)
    const [exit, setExit] = useState<boolean>(false)
    const [sharedLists, setSharedLists] = useState<ISharedList[]>([])
    const [lastSharedList, setLastSharedList] = useState<ISharedList[]>([])
    const [listParam, setListParam] = useState<ISharedList['id']>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showLink, setShowLink] = useState<boolean>(false)
    const [existsSharedList, setExistsSharedList] = useState<boolean>(false)

    const closeModal = () => {
        setExit(true)
        setTimeout(() => {
            setShowModal(false)
            setExit(false)
        }, 400)
    }

    const getLastSharedList = () => {
        const lastSharedList = sharedLists.filter((listShared) => {
            return listShared.listID === SESSION_ID
        })
        setLastSharedList(lastSharedList)
        setListParam(lastSharedList[0]?.id)
    }

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
        setShowLink(true)
        setLoading(false)
    }

    const updateListShared = async () => {
        setLoading(true)
        try {
            await database.collection("sharedLists").doc(lastSharedList[0]?.id).update({
                listProducts: [...LIST],
            })
        } catch {
            console.log('error');
        }
        setShowLink(true)
        setLoading(false)
    }

    const createMiListLink = () => {
        return navigator.clipboard.writeText(`http://localhost:3001/mylist/${listParam}`)
    }

    useEffect(() => {
        api.getSharedLists((sharedLists: ISharedList[]) => {
            setSharedLists(sharedLists)
        });
    }, []);

    useEffect(() => {
        getLastSharedList()
    }, [sharedLists])

    useEffect(() => {
        setListParam(lastSharedList[0]?.id)
    }, [lastSharedList])

    useEffect(() => {
        getLastSharedList()
        setShowLink(false)
        if (!lastSharedList.length) {
            setExistsSharedList(false)
        }
    }, [LIST])

    useEffect(() => {
        if (!!lastSharedList.length) {
            setExistsSharedList(true)
        }
    });
    
    const shareButton = <>{loading ? <p>Cargando...</p> : <button onClick={createNewListToShare}>COMPARTIR</button>}</>
    const updateButton = <>{loading ? <p>Cargando...</p> : <button onClick={updateListShared}>ACTUAILIZAR</button>}</>
    const fetchButtons = <>{existsSharedList ? updateButton : shareButton}</>

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
                            {
                                showLink ?
                                    <button onClick={createMiListLink}>
                                        COPIAR LINK
                                    </button> :
                                    fetchButtons
                            }
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
