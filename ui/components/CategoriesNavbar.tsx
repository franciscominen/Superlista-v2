import { useEffect } from "react"
import styled from "styled-components"
import { categoriesData } from "~/pages/api"
import CategoryButtonNavbar from "./CategoryButtonNavbar"

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

interface Props {
    onShowCategories: Function
    showCategories: boolean
}

const CategoriesNavbar = ({ onShowCategories, showCategories }: Props) => {

    return (
        <>
            <CategoriesNavbarWrapper active={showCategories}>
                {
                    categoriesData.map(category => {
                        return <CategoryButtonNavbar category={category} key={category.id} onShowCategories={onShowCategories}/>
                    })
                }
            </CategoriesNavbarWrapper>
        </>
    )
}

export default CategoriesNavbar
