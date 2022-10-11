import { useState } from 'react'
import Image from 'next/image'
import { IProduct } from '~/lib/types'
import styled from 'styled-components'
import { useProductsActions } from '~/lib/hooks'
import { SpacedContainer } from '../../styles/sharedStyles'
import NoteModal from '../modals/NoteModal'

const ListCard = styled.div<{ exit: boolean }>`
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    border-radius: 16px;
    transition: transform .3s, opacity .2s, height .2s .1s, margin-bottom .2s .05s;
    margin-bottom: ${({ exit }) => exit ? '0' : '8px'};
    height: ${({ exit }) => exit ? '0' : '4em'};
    transform: ${({ exit }) => exit ? 'translateX(-100%)' : 'translateX(0)'};
    opacity: ${({ exit }) => exit ? '0' : '1'};
`

const NoteText = styled.p<{ show: boolean }>`
    font-size: 16px;
    margin: 0;
    width: 12em;
    overflow-x: auto;
    padding: 0;
    display: ${({ show }) => show ? 'flex' : 'none'};;
`

type Props = {
    product: IProduct
}

const ProductListCard = ({ product }: Props) => {
    const { name, img, id, nota } = product
    const [showModal, setShowModal] = useState<boolean>(false)
    const [exit, setExit] = useState<boolean>(false)
    const { removeProduct } = useProductsActions()

    const onCloseModal = () => {
        setShowModal(false)
    }

    const onRemoveProduct = () => {
        setExit(!exit)
        setTimeout(() => {
            removeProduct(id)
        }, 300)
    }

    return (
        <>
            <ListCard exit={exit}>
                <SpacedContainer>
                    <Image src={img} alt={name} width={48} height={48} />
                    <span style={{ paddingLeft: '8px' }}>
                        <h3>{name}</h3>
                        <NoteText show={nota !== ''}>{nota}</NoteText>
                    </span>
                </SpacedContainer>
                <SpacedContainer>
                    <button onClick={() => setShowModal(true)}>
                        <Image src="/assets/icons/edit-icon.svg" alt="Edit" width={26} height={26} style={{ cursor: 'pointer' }} />
                    </button>
                    <button onClick={onRemoveProduct}>
                        <Image src="/assets/icons/close-icon.svg" alt="X" width={26} height={26} style={{ cursor: 'pointer' }} />
                    </button>
                </SpacedContainer>
            </ListCard>

            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />

            <style jsx>{`
                .button-img {
                    max-width: 18px;
                }
                span {
                    display: flex;
                    flex-direction: column;
                    justify: content
                }
                span h3 {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0 0 -2px 0;               
                }
            `}</style>
        </>
    )
}

export default ProductListCard
