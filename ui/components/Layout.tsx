import React, { Component, ReactNode } from "react"
import Navbar from './Navbar'
import Footer from './Footer'
import { NextComponentType } from "next"
import { MainContainer } from "../styles/sharedStyles"

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const Layout = ({ children, ...props }: Props) => {
    return (
        <>
            <>
                <Navbar />
                <MainContainer {...props}>{children}</MainContainer>
                <Footer />
            </>
        </>
    )
}

export default Layout