import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import { database } from "~/lib/firebase"
import { ISharedList } from "~/lib/types"
import { useList, useSessionId } from "~/lib/hooks"
import api from "~/pages/api"
import styled from "styled-components"
import { StyledModalWrapper, ModalContainer } from '~/ui/styles/sharedStyles'
import SmallLoader from "../utils/SmallLoader"
import { fade } from "../../styles/animations"
import { useRouter } from "next/router"

const ShareMyListModal = () => {
    const LIST = useList()
    const SESSION_ID = useSessionId()
    const router = useRouter()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [exit, setExit] = useState<boolean>(false)
    const [sharedLists, setSharedLists] = useState<ISharedList[]>([])
    const [lastSharedList, setLastSharedList] = useState<ISharedList[]>([])
    const [listParam, setListParam] = useState<ISharedList['id']>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showLink, setShowLink] = useState<boolean>(false)
    const [existsSharedList, setExistsSharedList] = useState<boolean>(false)

    console.log(router);
    

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

    const toastMessage = <p className='toast-text-link'>Link de la lista copiado.</p>
    const showToast = () => toast(toastMessage, {
        duration: 1600,
        position: 'bottom-center',
        style: {
            boxShadow: 'none',
            background: '#f6f6f6f0',
            border: '1px solid #D2D2D2',
            borderRadius: '20px',
            position: 'relative',
            bottom: '2em',
        },
    });

    const onCopyLink = () => {
        const URL = process.env.NEXT_PUBLIC_URL
        navigator.clipboard.writeText(`https://superlista.vercel.app/mylist/${listParam}`)
        showToast()
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

    const shareButton = <>{loading ? <SmallLoader /> : <ModalButton onClick={createNewListToShare}>COMPARTIR</ModalButton>}</>
    const updateButton = <>{loading ? <SmallLoader /> : <ModalButton onClick={updateListShared}>ACTUAILIZAR</ModalButton>}</>
    const fetchButtons = <>{existsSharedList ? updateButton : shareButton}</>

    const modal = (
        <>
            <StyledModalWrapper exit={exit}>
                <ModalContainer exit={exit}>
                    <CloseModalImg onClick={closeModal}>
                        <Image src="/assets/icons/close-icon.svg" alt="X" width={26} height={26} />
                    </CloseModalImg>
                    {!LIST.length ?
                        <>
                            <ModalText>Agregá al menos un elemento <br />para compartir tu lista.</ModalText>
                            <ModalButton onClick={closeModal}>OKEY</ModalButton>
                        </> :
                        <>
                            <ModalText>Comparti tu Lista!</ModalText>
                            {
                                showLink ?
                                    <ModalButton onClick={onCopyLink}>
                                        COPIAR LINK
                                    </ModalButton> :
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
            <OpenModalButton onClick={() => setShowModal(true)}>
                <Image src="/assets/icons/share-icon.svg" alt="Share" width={42} height={42} />
            </OpenModalButton>
            {showModal ? modal : null}
        </>
    )
}

export default ShareMyListModal;

const OpenModalButton = styled.button`
    padding: 0;
    margin: 0;
    cursor: pointer;
`

const CloseModalImg = styled.button`
    display: block;
    margin-left: auto;
    padding-right: 24px;
    cursor: pointer;
`

const ModalText = styled.p`
    font-size: 18px;
    font-family: var(--boldFont);
    text-align: center;
    margin-top: 8px;
`

const ModalButton = styled.button`
    font-size: 18px;
    font-family: var(--boldFont);
    background-color: var(--white);
    color: #8D8D8D;
    padding: 16px 16px;
    border-radius: 22px;
    margin-bottom: 12px;
    border: 3px solid #D2D2D2;
    margin: 12px auto;
    display: block;
    opacity: 0;
    animation: ${fade} .3s forwards;
    cursor: pointer;
`
