import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { IProduct } from '~/lib/types'
import { useProducts, useUtils } from '~/lib/hooks'
import styled from 'styled-components'

import ProductCard from '~/ui/components/cards/ProductCard'
import CategoriesCollapse from '~/ui/components/categoriesFilters/CategoriesCollapse'
import { Title } from '~/ui/styles/sharedStyles'
import ProductNotFound from '~/ui/components/utils/ProductNotFound'

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3%;
  grid-row-gap: 8px;
  padding: 0 3%;
  gap: 8px;
  width: 100%;
  transition: all .5s;
`

const Products: NextPage = () => {
  let PRODUCTS = useProducts()
  const { searchValue } = useUtils()

  const router = useRouter()
  const categoryQuery: string | string[] | undefined = router.query.slug

  PRODUCTS = !searchValue
    ? PRODUCTS
    : PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    )

  if (categoryQuery) {
    PRODUCTS = PRODUCTS.filter((product) => {
      return product.categoryID === categoryQuery[0]
    })
  }

  return (
    <main style={{ padding: '7em 0 2.5em 0', width: '100%' }}>
      <Head>
        <title>Superlista.ar | Productos</title>
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

      <CategoriesCollapse />

      <figure style={{ background: '#f5f5f5', height: '1px', width: '95%', margin: '8px 0 0 0' }} />

      <Title>Productos</Title>

      <ProductsContainer>
        {
          PRODUCTS
            .map((product: IProduct) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            })
        }
      </ProductsContainer>
      {!PRODUCTS.length ? <ProductNotFound /> : null}
    </main>
  )
}

export default Products
