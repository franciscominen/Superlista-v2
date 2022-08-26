import React, { ReactNode } from "react"
import Navbar from './Navbar'
import Footer from './Footer'
import { Provider as ProductsProvider } from "~/lib/context"
import { MainContainer } from "../styles/sharedStyles"
import { useRouter } from "next/router"

interface Props {
    children?: ReactNode
}

const Layout = ({ children, ...props }: Props) => {
    const router = useRouter()
    const isHome = router.route === '/'

    return (
        <ProductsProvider>
            <>
                {isHome ? null : <Navbar />}
                <MainContainer {...props}>{children}</MainContainer>
                <Footer />
            </>
        </ProductsProvider>
    )
}

export default Layout