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
                    <img src={product.img} alt="" className='product-img'/>
                    <span>
                        <h3>{product.name}</h3>
                        <p>{product.nota}</p>
                    </span>
                </SpacedContainer>
                <SpacedContainer>
                    <button onClick={() => setShowModal(true)}>
                        <img src="/assets/edit-icon.svg" alt="" />
                    </button>
                    <button onClick={() => removeProduct(product.id)}>
                        <img src="/assets/close-icon.svg" alt="" />
                    </button>
                </SpacedContainer>
            </ListCard>

            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />

            <style jsx>{`
                .button-img {
                    max-width: 18px;
                }
                .product-img {
                    max-width: 42px;
                    min-width: 32px;
                    width: 100%;
                    object-fit: contain;
                    margin-right: 8px;
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
