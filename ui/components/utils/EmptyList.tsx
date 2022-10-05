import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import { fade, slideLeft } from "../../styles/animations"

const EmptyListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 65vh;
`
const EmptyListText = styled.p`
    color: var(--darkgrey);
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    opacity: 0;
    animation: ${fade} .7s .5s forwards;
`

const EmptyListButton = styled.button`
    background-color: var(--white);
    border: 1px solid var(--gray);
    border-radius: 50px;
    color: var(--darkgrey);
    font-size: 16px;
    font-weight: 800;
    padding: 12px 28px;
    opacity: 0;
    animation: ${fade} .7s .8s forwards;
`

const ImageWrapper = styled.div`
    animation: ${slideLeft} .5s ease forwards;
`

const EmptyList = () => {
    return (
        <EmptyListWrapper>
            <ImageWrapper>
                <Image src='/assets/icons/empty-list-icon.svg' width={94} height={94} priority />
            </ImageWrapper>
            <EmptyListText>Parece que todavía no <br />agregaste nada</EmptyListText>
            <Link href='/products'>
                <EmptyListButton>
                    Agregar Productos
                </EmptyListButton>
            </Link>
        </EmptyListWrapper>
    )
}

export default EmptyList