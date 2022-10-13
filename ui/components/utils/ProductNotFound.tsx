import Image from "next/image"
import styled from "styled-components"
import { fade, slideLeft } from "../../styles/animations"
import CreateProductModal from "../modals/CreateProductModal"

const EmptyListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`
const EmptyListText = styled.p`
    color: var(--darkgrey);
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    opacity: 0;
    animation: ${fade} .7s .5s forwards;
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

const ImageWrapper = styled.div`
    animation: ${slideLeft} .5s ease forwards;
`

const ProductNotFound = () => {
    return (
        <EmptyListWrapper>
            <ImageWrapper>
                <Image src='/assets/icons/empty-list-icon.svg' width={94} height={94} priority />
            </ImageWrapper>
            <EmptyListText>Parece que este producto no esta.</EmptyListText>
            <CreateProductModal />
        </EmptyListWrapper>
    )
}

export default ProductNotFound
