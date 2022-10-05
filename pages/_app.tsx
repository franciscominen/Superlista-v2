
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider as ProductsProvider } from "~/lib/context"
import { Toaster } from 'react-hot-toast';
import GlobalStyle from '~/ui/styles/globalStyles'
import Layout from '~/ui/components/layout/Layout'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ProductsProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ProductsProvider>
  )
}

