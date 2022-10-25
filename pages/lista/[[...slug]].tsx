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
    padding: 7.5em 3% 3em 3%;
    transition: .5s;
    //animation: ${slideInBottom} .5s ease;
`

const MyList: NextPage = () => {
    const LIST = useList()

    return (
        <>
            <Head>
                <title>Superlista.ar | Mi Lista</title>
                <meta name="description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
                <link rel="icon" href="/favicon.png" />
                <meta property="og:url" content="https://superlista.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Superlista.ar | Armá tu lista para ir al super" />
                <meta property="og:description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
                <meta property="og:image" itemProp="image" content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1" />
                <meta property="og:image:secure_url" content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@superlista_ar" />
                <meta name="twitter:creator" content="@franminen" />
                <meta name="twitter:title" content="Superlista.ar | Armá tu lista para ir al super" />
                <meta name="twitter:description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
                <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1" />
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
