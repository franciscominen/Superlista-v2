import React, { ReactNode, useState } from "react"
import { useRouter } from "next/router"
import { Provider as ProductsProvider } from "~/lib/context"
import { MainContainer } from "../../styles/sharedStyles"
import CategoriesFilterButton from "../categoriesFilters/CategoriesFilterButton"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface Props {
    children?: ReactNode
}

const Layout = ({ children, ...props }: Props) => {
    const router = useRouter()
    const isHome = router.route === '/'
    const isProducts = router.route === '/products/[[...slug]]'
    const [showCategories, setShowCategories] = useState<boolean>(false)

    const onShowCategories = () => {
        setShowCategories(!showCategories)
    }

    return (
        <ProductsProvider>
            <>
                {isHome ?
                    null :
                    <Navbar
                        onShowCategories={onShowCategories}
                        showCategories={showCategories}
                        setShowCategories={setShowCategories}
                    />
                }

                {isProducts ?
                    <CategoriesFilterButton onShowCategories={onShowCategories}/>
                    : null
                }

                <MainContainer {...props}>{children}</MainContainer>
                <Footer />
            </>
        </ProductsProvider>
    )
}

export default Layout
