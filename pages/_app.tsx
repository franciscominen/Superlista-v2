
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { Provider as ProductsProvider } from "~/lib/context"
import { Toaster } from 'react-hot-toast';
import GlobalStyle from '~/ui/styles/globalStyles'
import Layout from '~/ui/components/layout/Layout'
import Head from 'next/head';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>

      <Head>
        <title>Superlista.ar</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
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
      <ProductsProvider>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ProductsProvider>
      <Analytics />
    </>

  )
}

