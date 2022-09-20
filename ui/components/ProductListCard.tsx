import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import { SpacedContainer } from '../styles/sharedStyles'
import NoteModal from './NoteModal'


interface Props extends IProduct {
    product: IProduct
}

const ProductListCard = (product: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { removeProduct } = useProductsActions()

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <ListCard>
                <SpacedContainer>
                    <Image src={product.img} alt={product.name} width={48} height={48} />
                    <span style={{paddingLeft: '8px'}}>
                        <h3>{product.name}</h3>
                        <p>{product.nota}</p>
                    </span>
                </SpacedContainer>
                <SpacedContainer>
                    <button onClick={() => setShowModal(true)}>
                        <Image src="/assets/edit-icon.svg" alt="Edit" width={26} height={26} />
                    </button>
                    <button onClick={() => removeProduct(product.id)}>
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

const ListCard = styled.div`
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    border-radius: 16px;
`
