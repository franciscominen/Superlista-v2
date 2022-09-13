import React, { ReactNode, useState } from "react"
import Navbar from './Navbar'
import Footer from './Footer'
import { Provider as ProductsProvider } from "~/lib/context"
import { MainContainer } from "../styles/sharedStyles"
import { useRouter } from "next/router"
import styled from "styled-components"

interface Props {
    children?: ReactNode
}

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
    transition: all .3s;
    transform: ${({ active }) => active ? 'translateX(0)' : 'translateX(-15em)'};
`

const Layout = ({ children, ...props }: Props) => {
    const router = useRouter()
    const isHome = router.route === '/'
    const [showCategories, setShowCategories] = useState<boolean>(false)
    const [filterIconActive, setFilterIconActive] = useState<boolean>(false)

    const onShowCategories = () => {
        setShowCategories(!showCategories)
    }

    const showFilterIcon = () => {
       window.scrollY > 400 ? 
        setFilterIconActive(true) : 
        setFilterIconActive(false) 
    }
    window.addEventListener("scroll", showFilterIcon);

    return (
        <ProductsProvider>
            <>
                {isHome ? null : <Navbar onShowCategories={onShowCategories} showCategories={showCategories}/>}
                <ShowCategoriesButton onClick={onShowCategories} active={filterIconActive}>
                    <img
                        src="/assets/filter-icon.svg"
                        alt="Filter"
                        style={{ maxWidth: '46px', position: 'relative', top: '3px' }}
                    />
                </ShowCategoriesButton>
                <MainContainer {...props}>{children}</MainContainer>
                <Footer />
            </>
        </ProductsProvider>
    )
}

export default Layout