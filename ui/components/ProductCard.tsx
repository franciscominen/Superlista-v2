import { useState } from 'react'
import styled from 'styled-components'
import { useList, useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import NoteModal from './NoteModal'

interface Props extends IProduct {
    product: IProduct
}

const ProductCard = (product: Props) => {
    const list = useList()
    const [showModal, setShowModal] = useState(false);
    const { addProduct } = useProductsActions()

    let isInList = list.some((listProduct) => listProduct.id === product.id)

    const onAddProduct = () => {
        addProduct(product)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <Card disabled={isInList}>
                <ButtonsContainer>
                    <button onClick={() => setShowModal(true)}>
                        <img src="/assets/add-note-icon.svg" alt="Edit" className='button-img' />
                    </button>
                    <button onClick={onAddProduct}>
                        <img src="/assets/add-icon.svg" alt="Add" className='button-img' />
                    </button>
                </ButtonsContainer>
                <img src={product.img} alt={product.name} className='product-img' />
                <h3>{product.name}</h3>
            </Card>
            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />

            <style jsx>{`
                .button-img {
                    max-width: 18px;
                }
                .product-img {
                    max-width: 64px;
                    min-width: 22px;
                    width: 100%;
                    object-fit: contain;
                }
                h3 {
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                    margin: 0;
                    padding: 0 6px;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    )
}

export default ProductCard

const Card = styled.span<{ disabled: boolean }>`
    max-width: 240px;
    min-width: 50px;
    width: 100%;
    min-height: 145px;
    object-fit: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: var(--white);
    border-radius: 16px;
    padding: 8px 3px;
    transition: all .3s;
    opacity: ${({ disabled }) => disabled ? '0.6' : '1'};
    pointer-events:  ${({ disabled }) => disabled ? 'none' : 'all'};
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
