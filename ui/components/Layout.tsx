import React, { Component, ReactNode } from "react"
import Navbar from './Navbar'
import Footer from './Footer'
import { NextComponentType } from "next"

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