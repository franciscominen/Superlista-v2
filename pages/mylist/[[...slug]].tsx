import Head from 'next/head'
import { NextPage } from 'next'
import { useList } from '~/lib/hooks'
import { IProduct } from '~/lib/types'
import styled from 'styled-components'

import ProductListCard from '~/ui/components/cards/ProductListCard'
import ClearListButton from '~/ui/components/utils/ClearListButton'
import EmptyList from '~/ui/components/utils/EmptyList'
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
            </Head>
            {
                !LIST.length ?
                    <EmptyList /> :
                    <MyListWrapper>
                        {LIST.map((product: IProduct) => {
                            return (
                                <ProductListCard
                                    key={product.name}
                                    product={product}
                                />
                            )
                        }).reverse()}
                    </MyListWrapper>
            }
            <ClearListButton />
        </>
    )
}

export default MyList
