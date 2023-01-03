import { useEffect, useState } from "react"
import Image from "next/image"
import { database } from "~/lib/firebase"
import { ISharedList } from "~/lib/types"
import { useList, useSessionId } from "~/lib/hooks"
import api from "~/pages/api"
import styled from "styled-components"
import { StyledModalWrapper, ModalContainer, CenterContainer } from '~/ui/styles/sharedStyles'
import SmallLoader from "../utils/SmallLoader"
import { fade } from "../../styles/animations"
import PDFDownloadButton from "../utils/PDFDownloadButton"
import showToast from "../utils/Toast"

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

    const onCopyLink = () => {
        // const URL = process.env.NEXT_PUBLIC_URL
        navigator.clipboard.writeText(`https://superlista.vercel.app/lista/${listParam}`)
        showToast(<p className='toast-text-link'>Link de la lista copiado.</p>)
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
        if (!lastSharedList.length) {
            setExistsSharedList(true)
        }
    });

    const shareButton = <>
        {loading ? <SmallLoader /> :
            <CenterContainer>
                <ModalButton onClick={createNewListToShare}>COMPARTIR</ModalButton>
                <PDFDownloadButton />
            </CenterContainer>
        }
    </>
    const updateButton = <>
        {loading ? <SmallLoader /> :
            <CenterContainer>
                <ModalButton onClick={updateListShared}>ACTUALIZAR</ModalButton>
                <PDFDownloadButton />
            </CenterContainer>
        }
    </>
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
                            <CenterContainer><ModalButton onClick={closeModal}>OKEY</ModalButton></CenterContainer>
                        </> :
                        <>
                            <ModalText>Comparti tu Lista!</ModalText>
                            {
                                showLink ?
                                    (<CenterContainer>
                                        <ModalButton onClick={onCopyLink}>
                                            COPIAR LINK
                                        </ModalButton>
                                        <PDFDownloadButton />
                                    </CenterContainer>) :
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
    font-weight: 600;
    text-align: center;
    margin: 8px 0 16px 0;
`

const ModalButton = styled.button`
    font-size: 18px;
    font-weight: 700;
    background-color: var(--white);
    color: #8D8D8D;
    padding: 16px 16px;
    border-radius: 22px;
    border: 3px solid #D2D2D2;
    display: block;
    opacity: 0;
    animation: ${fade} .3s forwards;
    cursor: pointer;
`
