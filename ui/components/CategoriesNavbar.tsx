import { useState } from "react"
import styled from "styled-components"
import { useProductsActions, useUtils } from "~/lib/hooks"
import { categoriesData } from "~/pages/api"

const CategoriesNavbarWrapper = styled.div<{ active: boolean }>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    width: 90%;
    padding: ${({ active }) => active ? '12px 0 16px 0' : '0'};
    transition: all .4s;
    transform: ${({ active }) => active ? 'scaleY(1)' : 'scaleY(0)'};
    opacity: ${({ active }) => active ? '1' : '0'};
    height: ${({ active }) => active ? '24.5em' : '0'};
    transform-origin: 100% 0%;
`
const CategoryButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 12px;
    background-color: white;
    border-radius: 0 15px 15px 15px;
`
const ShowCategoriesButton = styled.button`
    background-color: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 3%;
    bottom: -19em;
    width: 58px;
    height: 58px;
    border-radius: 50%;
`

interface Props {
    onShowCategories: Function
    showCategories: boolean
}

const CategoriesNavbar = ({ onShowCategories, showCategories }: Props) => {

    const onFilter = () => {
        onShowCategories()
    }

    return (
        <>
            <CategoriesNavbarWrapper active={showCategories}>
                {
                    categoriesData.map(category => {
                        return (
                            <CategoryButton key={category.id} onClick={onFilter}>
                                <img src={category.img} alt={category.title} />
                                <p style={{ fontSize: '18px' }}>{category.title}</p>
                            </CategoryButton>
                        )
                    })
                }
            </CategoriesNavbarWrapper>
        </>
    )
}

export default CategoriesNavbar
