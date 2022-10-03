import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { IProduct } from '~/lib/types'
import { useProducts, useUtils } from '~/lib/hooks'
import styled from 'styled-components'

import ProductCard from '~/ui/components/cards/ProductCard'
import CategoriesCollapse from '~/ui/components/categoriesFilters/CategoriesCollapse'
import { Title } from '~/ui/styles/sharedStyles'

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3%;
  grid-row-gap: 8px;
  padding: 0 3%;
  width: 100%;
  transition: all .5s;
`

const Products: NextPage = () => {
  let products = useProducts()
  const { searchValue } = useUtils()

  const router = useRouter()
  const categoryQuery: string | string[] | undefined = router.query.slug

  products = !searchValue
    ? products
    : products.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    )

  if (categoryQuery) {
    products = products.filter((product) => {
      return product.categoryID === categoryQuery[0]
    })
  }
  
  return (
    <>
      <Head>
        <title>Superlista.ar | Productos</title>
      </Head>

      <CategoriesCollapse />

      <figure style={{ background: '#f5f5f5', height: '1px', width: '95%', margin: '8px 0 0 0' }} />

      <Title>Productos</Title>

      <ProductsContainer>
        {
          products
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
    </>
  )
}

export default Products
