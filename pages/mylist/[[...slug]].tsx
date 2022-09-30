import Head from 'next/head'
import { NextPage } from 'next'
import { useList } from '~/lib/hooks'
import { IProduct } from '~/lib/types'

import ProductListCard from '~/ui/components/ProductListCard'
import styled from 'styled-components'
import ClearListButton from '~/ui/components/ClearListButton'
import EmptyList from '~/ui/components/EmptyList'
import { slideInBottom } from '~/ui/styles/animations'

const MyListWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 12px 3%;
    transition: .5s;
    animation: ${slideInBottom} .5s ease;
`

const MyList: NextPage = () => {
    const LIST = useList()
    
    return (
        <>
            <Head>
                <title>Superlista.ar | Productos</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MyListWrapper>
                {
                    !LIST.length ?
                        <EmptyList /> :
                        LIST.map((product: IProduct) => {
                            return (
                                <ProductListCard
                                    key={product.name}
                                    product={product}
                                />
                            )
                        }).reverse()
                }
            </MyListWrapper>

            <ClearListButton />
        </>
    )
}

export default MyList
