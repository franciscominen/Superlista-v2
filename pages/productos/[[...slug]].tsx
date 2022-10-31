import { NextPage } from 'next'
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

      <CategoriesCollapse />

      <figure style={{ background: '#f5f5f5', height: '1px', width: '95%', margin: '8px auto 0 auto' }} />

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
