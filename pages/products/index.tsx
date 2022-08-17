import { ChangeEvent, ReactElement, useState } from 'react'
import type { NextPageWithLayout } from '~/pages/_app'
import Head from 'next/head'

import { IProduct } from '~/lib/types'
import { useProducts } from '~/lib/hooks'

import Layout from '~/ui/components/Layout'
import ProductCard from '~/ui/components/ProductCard'
import SearchProductInput from '~/ui/components/SearchProductInput'

import { Title } from '~/ui/styles/sharedStyles'
import styled from 'styled-components'

const Products: NextPageWithLayout = () => {
  const products = useProducts()
  const [searchTerm, setSearchTerm] = useState("");

  const results = !searchTerm
    ? products
    : products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  return (
    <>
      <Head>
        <title>Superlista.ar | Productos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <SearchProductInput setSearchTerm={setSearchTerm} searchTerm={searchTerm}/> */}
      <Title>Productos</Title>

      <ProductsContainer>
        {
          results
            .map((product: IProduct) => {
              return (
                <ProductCard
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
      </ProductsContainer>
    </>
  )
}

Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Products

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3%;
  grid-row-gap: 8px;
  padding: 0 3%;
`
