import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

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
`

const EmptyListButton = styled.button`
    background-color: var(--white);
    border: 1px solid var(--gray);
    border-radius: 50px;
    color: var(--darkgrey);
    font-size: 16px;
    font-weight: 800;
    padding: 12px 28px;
`

const EmptyList = () => {

    return (
        <EmptyListWrapper>
            <Image src='/assets/empty-list-icon.svg' width={94} height={94} priority />
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
