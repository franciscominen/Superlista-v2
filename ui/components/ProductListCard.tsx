import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import { slideInBottom } from '../styles/animations'
import { SpacedContainer } from '../styles/sharedStyles'
import NoteModal from './NoteModal'


const ListCard = styled.div<{ exit: boolean }>`
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    border-radius: 16px;
    //animation: ${slideInBottom} 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) forwards;
    transition: transform .5s, opacity .4s, height .4s .2s, margin-bottom .4s .2s;
    margin-bottom: ${({ exit }) => exit ? '0' : '8px'};
    height: ${({ exit }) => exit ? '0' : '4em'};
    transform: ${({ exit }) => exit ? 'translateX(-100%)' : 'translateX(0)'};
    opacity: ${({ exit }) => exit ? '0' : '1'};
`

interface Props extends IProduct {
    product: IProduct
}

const ProductListCard = (product: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [exit, setExit] = useState(false)
    const { removeProduct } = useProductsActions()

    const onCloseModal = () => {
        setShowModal(false)
    }

    const onRemoveProduct = () => {
        setExit(!exit)
        setTimeout(() => {
            removeProduct(product.id)
        }, 800)
    }

    return (
        <>
            <ListCard exit={exit}>
                <SpacedContainer>
                    <Image src={product.img} alt={product.name} width={48} height={48} />
                    <span style={{ paddingLeft: '8px' }}>
                        <h3>{product.name}</h3>
                        <p>{product.nota}</p>
                    </span>
                </SpacedContainer>
                <SpacedContainer>
                    <button onClick={() => setShowModal(true)}>
                        <Image src="/assets/edit-icon.svg" alt="Edit" width={26} height={26} />
                    </button>
                    <button onClick={onRemoveProduct}>
                        <Image src="/assets/close-icon.svg" alt="X" width={26} height={26} />
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
                    font-size: 16px;
                    margin: 0 0 2px 0;               
                }
                span p {
                    font-size: 13px;
                    margin: 0;
                }
            `}</style>
        </>

    )
}

export default ProductListCard
