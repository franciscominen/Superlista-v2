import { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useList, useProductsActions } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import toast from 'react-hot-toast';
import NoteModal from './NoteModal'

const Card = styled.div<{ disabled: boolean }>`
    position: relative;
    width: 124px;
    height: 145px;
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

const ImageWrapper = styled.div`
    position: "relative";
    width: 64px;
    height: 64px;
    max-height: 64px;
    max-width: 64px;
`

interface Props extends IProduct {
    product: IProduct
}

const ProductCard = (product: Props) => {
    const list = useList()
    const [showModal, setShowModal] = useState(false);
    const { addProduct } = useProductsActions()

    let isInList = list.some((listProduct) => listProduct.id === product.id)

    const toastMessage = <p className='toast-text'>Agregaste <strong>{product.name}</strong> a tu lista.</p>
    const showToast = () => toast(toastMessage, {
        duration: 1200,
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

    const onAddProduct = () => {
        addProduct(product)
        showToast()
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <Card disabled={isInList}>
                <ButtonsContainer>
                    <button onClick={() => setShowModal(true)}>
                        <Image src="/assets/add-note-icon.svg" alt="Edit" width={18} height={18} />
                    </button>
                    <button onClick={onAddProduct}>
                        <Image src="/assets/add-icon.svg" alt="Add" width={18} height={18} />
                    </button>
                </ButtonsContainer>

                <ImageWrapper>
                    <Image
                        src={product.img}
                        alt={product.name}
                        layout="responsive"
                        width={64}
                        height={64}
                    />
                </ImageWrapper>

                <h3>{product.name}</h3>
            </Card>
            <NoteModal show={showModal} closeModal={onCloseModal} product={product} />
            <style jsx>{`
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
