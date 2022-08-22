import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '~/pages/_app'
import Head from 'next/head'

import { useList } from '~/lib/hooks'
import { IProduct } from '~/lib/types'

import Layout from '~/ui/components/Layout'
import ProductListCard from '~/ui/components/ProductListCard'
import styled from 'styled-components'
import ClearListButton from '~/ui/components/ClearListButton'

const MyList: NextPageWithLayout = () => {
    const list = useList()

    return (
        <>
            <Head>
                <title>Superlista.ar | Productos</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MyListWrapper>
                {
                    !list.length ?
                        <p>Tu Lista esta vacia.</p> :
                        list.map((product: IProduct) => {
                            return (
                                <ProductListCard
                                    id={product.id}
                                    name={product.name}
                                    img={product.img}
                                    nota={product.nota}
                                    categoryID={product.categoryID}
                                    key={product.name}
                                    product={product}
                                />
                            )
                        })
                }
            </MyListWrapper>

            <ClearListButton />
        </>
    )
}

MyList.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default MyList

const MyListWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 12px 3%;
`
