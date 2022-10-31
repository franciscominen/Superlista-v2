
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
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

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: "og:image",
          content:
            "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1",
          key: "ogimage",
        },
        {
          property: "og:image:width",
          content: "400",
          key: "ogimagewidth",
        },
        {
          property: "og:image:height",
          content: "300",
          key: "ogimageheight",
        },
        {
          property: "og:url",
          content: `https://superlista.vercel.app/`,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content:
            "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1",
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: "Superlista.ar | Armá tu lista para ir al super",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content: "Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado.",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
          key: "twittercard"
        },
        {
          name: "twitter:site",
          content: "@superlista_ar",
          key: "twittersite"
        },
        {
          name: "twitter:creator",
          content: "@franminen",
          key: "twittercreator"
        },
        {
          name: "twitter:title",
          content: "Superlista.ar | Armá tu lista para ir al super",
          key: "twittertitle"
        },
        {
          name: "twitter:description",
          content: "Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado.",
          key: "twitterdescription"
        },
        {
          name: "twitter:image",
          content: "https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1",
          key: "twitterimage"
        },
      ],
    },
  };
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { openGraphData = [] } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>

      <Head>
        <title>Superlista.ar</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
        
        {openGraphData.map((og: any) => (
          <meta {...og} />
        ))}
      </Head>
      <ProductsProvider>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ProductsProvider>
    </>

  )
}

