import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import { categoriesData } from "~/pages/api"
import { fade } from "../styles/animations"
import { SpacedContainer, Title } from "../styles/sharedStyles"
import CategoryButton from "./CategoryButton"

const CategoriesWrapper = styled.div<{ active: boolean }>`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0;
    transition: all .3s;
    transform: ${({ active }) => active ? 'scaleY(0)' : 'scaleY(1)'};
    opacity: ${({ active }) => active ? '0' : '1'};
    height: ${({ active }) => active ? '0' : '12.5em'};
    transform-origin: 100% 0%;
    z-index: 2;
    opacity: 0;
    animation: ${fade} 0.3s ease-in .2s forwards;
`

const CollapseButton = styled.button<{ active: boolean }>`
    transition: all .3s;
    transform: ${({ active }) => active ? 'rotate(180deg)' : 'rotate(0)'};
`

const CategoriesCollapse = () => {
    const [showCategories, setShowCategories] = useState<boolean>(false)
    const onShowCategories = () => {
        setShowCategories(!showCategories) 
    }

    return (
        <>
            <SpacedContainer style={{ width: '100%', zIndex: '4' }}>
                <Title>Categorías</Title>
                <CollapseButton active={showCategories} onClick={onShowCategories}>
                    <Image src="/assets/collapse-icon.svg" alt=">" width={32} height={32} />
                </CollapseButton>
            </SpacedContainer>

            <CategoriesWrapper active={showCategories}>
                {
                    categoriesData.map((category) => {
                        return <CategoryButton category={category} key={category.id} />
                    })
                }
            </CategoriesWrapper>
        </>
    )
}

export default CategoriesCollapse
