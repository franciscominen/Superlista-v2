import Navbar from './navbar'
import Footer from './footer'
import React, { ReactNode } from "react"

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const Layout = ({ children, ...props }: Props) => {
    return (
        <>
            <Navbar />
                <main {...props}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout