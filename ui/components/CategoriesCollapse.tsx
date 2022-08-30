import styled from "styled-components"
import { categoriesData } from "~/pages/api"
import CategoryButton from "./CategoryButton"

const CategoriesWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 12px;
`

const CategoriesCollapse = () => {

    return (
        <CategoriesWrapper>
            {
                categoriesData.map((category) => {
                    return <CategoryButton category={category} key={category.id} />
                })
            }
        </CategoriesWrapper>
    )
}

export default CategoriesCollapse
