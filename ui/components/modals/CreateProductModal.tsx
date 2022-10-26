import { useState } from "react";
import Image from "next/image";
import {
    StyledModalWrapper,
    ModalContainer,
    Strong
} from '~/ui/styles/sharedStyles'
import styled from "styled-components";
import { fade } from "~/ui/styles/animations";
import { categoriesData } from "~/pages/api";
import { v4 as uuid } from 'uuid';
import { useProducts, useProductsActions } from "~/lib/hooks";
import { IProduct } from "~/lib/types";
import toast from "react-hot-toast";

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const ProductNameInput = styled.input`
    border: none;
    border-bottom: 1px solid var(--gray);
    border-radius: 0;
    font-family: var(--principalFont);
    width: 85%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 2px;
    transition: all .2s;
    margin-bottom: 16px;
    &::placeholder {
        font-weight: 400;
    }
    &:focus {
        outline: none;
        border-bottom: 1px solid var(--dark);
    }
`
const CategoriesWrapper = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 8px;
    margin-bottom: 16px;
`

const CategoryButtonLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    gap: 8px;
    border-radius: 50%;
`

const CategoryButton = styled.input`
    height: 35px;
    width: 35px;
    outline: 2px solid ${props => props.color};
    border-radius: 50%;
    appearance: none;
    transition: all .2s;
    &:checked {
        appearance: none;
        background-color: ${props => props.color};
        border-radius: 50%;
        outline: 1px solid var(--darkgrey);
    }
`

const NoteInput = styled.input`
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-family: var(--principalFont);
    font-weight: 500;
    width: 85%;
    resize: none;
    border-bottom: 1px solid #c8c8c8;
    border-radius: 0;
    padding: 0 4px 4px 4px;
    text-align: center;
    transition: all .2s;
    margin-bottom: 16px;
    :focus {
        outline: none;
        border-bottom: 2px solid var(--dark);
    }
    ::placeholder {
        font-weight: 400;
    }
`

const EmptyListButton = styled.button`
    background-color: var(--white);
    border: 1px solid var(--gray);
    border-radius: 50px;
    color: var(--darkgrey);
    font-family: var(--principalFont);
    font-size: 18px;
    font-weight: 600;
    padding: 12px 28px;
    opacity: 0;
    animation: ${fade} .7s .8s forwards;
    cursor: pointer;
`

const Title = styled.h2`
    color: var(--dark);
    font-weight: 600;
    font-size: 16px;
    text-align: center;
`

const CreateProductButton = styled.button`
    margin-top: 16px;
    width: 14em;
    background-color: var(--dark);
    color: var(--light);
    font-size: 18px;
    font-weight: 600;
    padding: 16px 28px;
    border-radius: 28px;
    text-align: center;
    opacity: 0;
    animation: ${fade} .3s ease-in .2s forwards;
    transition: all .3s;
    cursor: pointer;
    &:disabled {
        background-color: var(--darkgrey);
    }
`

const CreateProductModal = () => {
    const PRODUCTS = useProducts()
    const { addProduct, clearSearch } = useProductsActions()

    const [showModal, setShowModal] = useState(false)
    const [exit, setExit] = useState(false)

    const [createdProduct, setCreatedProduct] = useState<IProduct>({
        id: '',
        name: '',
        img: '',
        nota: '',
        categoryID: '',
        timestamp: new Date()
    })

    const productExist = PRODUCTS.some(
        (product) => product.name.toLowerCase() === createdProduct.name.toLowerCase()
    );

    const toastMessage = () => {
        if (productExist) return <p className='toast-text'>Este producto ya existe.</p>
        return <p className='toast-text'>Agregaste <Strong>{createdProduct.name}</Strong> a tu lista.</p>
    }

    const showToast = () => toast(toastMessage, {
        duration: 1000,
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

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (productExist) {
            showToast()
        } else {
            addProduct(createdProduct)
            closeModal()
            showToast()
            setTimeout(() => {
                clearSearch()
            }, 1100)
        }
    }

    const generateProductId = () => {
        setCreatedProduct(current => {
            return {
                ...current,
                id: uuid()
            }
        })
    }

    const onOpenModal = () => {
        setShowModal(true)
        generateProductId()
    }

    const closeModal = () => {
        setExit(true)
        setTimeout(() => {
            setShowModal(false)
            setExit(false)
        }, 400)
    }

    const modal = (
        <>
            <StyledModalWrapper exit={exit}>
                <ModalContainer exit={exit}>
                    <div className='close-btnHome'>
                        <Image 
                            src="/assets/icons/close-icon.svg" 
                            alt="X" 
                            width={24} 
                            height={24} 
                            onClick={closeModal} 
                        />
                    </div>
                    <Form>
                        <ProductNameInput
                            onChange={(e) => setCreatedProduct({ ...createdProduct, name: e.target.value })}
                            value={createdProduct.name}
                            type="text"
                            placeholder="Nombre del Producto"
                            maxLength={22}
                        />
                        <Title>Agrega una nota (o no):</Title>
                        <NoteInput
                            type="text"
                            placeholder="Cantidad, marca, tipo"
                            onChange={(e) => setCreatedProduct({ ...createdProduct, nota: e.target.value })}
                            value={createdProduct.nota}
                            maxLength={70}
                        />
                        <Title>Selecciona la categoria:</Title>
                        <CategoriesWrapper>
                            {
                                categoriesData.map((category) => {
                                    return (
                                        <CategoryButtonLabel key={category.id}>
                                            <CategoryButton
                                                type="radio"
                                                id={category.title}
                                                value={category.link}
                                                onChange={(e) => setCreatedProduct({
                                                    ...createdProduct,
                                                    categoryID: e.target.value,
                                                    img: category.categoryColor
                                                })}
                                                name="categories"
                                                color={category.colorCode}
                                            />
                                            {category.title}
                                        </CategoryButtonLabel>
                                    )
                                })
                            }
                        </CategoriesWrapper>
                    </Form>
                </ModalContainer>
                <CreateProductButton
                    onClick={handleSubmit}
                    disabled={!createdProduct.name || !createdProduct.categoryID}
                >
                    Crear Producto
                </CreateProductButton>
            </StyledModalWrapper>
            <style jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    overflow: hidden;
                }
                .close-btnHome {
                    width: 100%;
                    text-align: right;
                    padding-right: 22px;
                    margin-bottom: 12px;
                }
            `}</style>
        </>
    )

    return (
        <>
            <EmptyListButton onClick={onOpenModal}>
                Crear Producto
            </EmptyListButton>

            {showModal ? modal : null}
        </>
    )
}

export default CreateProductModal;
