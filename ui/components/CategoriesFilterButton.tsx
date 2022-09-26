import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"

const ShowCategoriesButton = styled.button<{ active: boolean }>`
background-color: var(--dark);
display: flex;
justify-content: center;
align-items: center;
position: fixed !important;
left: 3%;
top: 82%;
width: 58px;
height: 58px;
border-radius: 50%;
z-index: 10;
transition: all .3s;
transform: ${({ active }) => active ? 'translateX(0)' : 'translateX(-15em)'};
`

interface Props {
    onShowCategories: Function
}

const CategoriesFilterButton = ({ onShowCategories }: Props) => {
    const [filterIconActive, setFilterIconActive] = useState<boolean>(false)

    const showFilterIcon = () => {
        window.scrollY > 400 ?
            setFilterIconActive(true) :
            setFilterIconActive(false)
    }
    window.addEventListener("scroll", showFilterIcon);

    return (
        <ShowCategoriesButton onClick={() => onShowCategories()} active={filterIconActive}>
            <Image
                src="/assets/filter-icon.svg"
                alt="Filter"
                height={46}
                width={46}
                style={{ position: 'relative', top: '3px' }}
            />
        </ShowCategoriesButton>
    )
}

export default CategoriesFilterButton