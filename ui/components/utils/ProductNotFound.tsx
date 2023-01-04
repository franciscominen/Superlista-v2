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

const ImageWrapper = styled.div`
    animation: ${slideLeft} .5s ease forwards;
`

const ProductNotFound = () => {
    return (
        <EmptyListWrapper>
            <ImageWrapper>
                <Image src='/assets/icons/empty-list-icon.svg' alt="empty" width={94} height={94} priority />
            </ImageWrapper>
            <EmptyListText>Parece que este producto no esta.</EmptyListText>
            <CreateProductModal />
        </EmptyListWrapper>
    )
}

export default ProductNotFound
