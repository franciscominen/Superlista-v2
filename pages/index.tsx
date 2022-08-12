import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '~/ui/components/Footer'
import ClearListModal from '~/ui/components/ClearListModal'
import { useState } from 'react'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Superlista.ar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Superlista.ar</h1>
      <ClearListModal modalIcon={'Empezar nueva lista'}/>
      <Link href="/products">
        Continuar mi lista
      </Link>

      <Footer />
    </>
  )
}

export default Home
