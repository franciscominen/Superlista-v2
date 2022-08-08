import { ReactElement, useEffect } from 'react'
import Layout from '@/components/layout'
import type { NextPageWithLayout } from '@/pages/_app'
import Head from 'next/head'
import { useProducts } from '@/hooks'
import ProductCard from '@/components/productCard'
import { IProduct } from '@/resources/types'

const Products: NextPageWithLayout = () => {

  const products = useProducts()

  return (
    <>
      <Head>
        <title>Superlista.ar | Productos</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        products.map((product: IProduct) => {
          return (
            <ProductCard
              id={product.id}
              name={product.name}
              img={product.img}
              note={product.note}
              category={product.category}
              key={product.name}
              product={product}
            />
          )
        })
      }
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
