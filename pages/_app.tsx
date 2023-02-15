import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "~/ui/styles/globalStyles";
import Layout from "~/ui/components/layout/Layout";
import Head from "next/head";
import useProductsActions from "~/lib/store/actions/useProductsActions";
import { useListStore } from "~/lib/store/state";
import Loading from "~/ui/components/utils/Loading";
import useListActions from "~/lib/store/actions/useListActions";
import { useRouter } from "next/router";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const isLoading = useListStore((state) => state.IS_LOADING);
  const router = useRouter();
  const listParam = router.query.slug;
  const { fetchProducts } = useProductsActions();
  const { fetchSharedList, getSharedListId } = useListActions();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    fetchProducts();
  }, []);

  useEffect(() => {
    if (listParam) {
      fetchSharedList(listParam[0]);
      getSharedListId(listParam[0]);
      useListStore.setState((state) => ({
        ...state,
        SESSION_ID: listParam[0],
      }));
    }
  }, [listParam]);

  if (isSSR) return null;
  if (isLoading) return <Loading />;

  return getLayout(
    <>
      <Head>
        <title>Superlista.ar</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado."
        />
        <meta property="og:url" content="https://superlista.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Superlista.ar | Armá tu lista para ir al super"
        />
        <meta
          property="og:description"
          content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1"
        />
        <meta
          property="og:image:secure_url"
          content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@superlista_ar" />
        <meta name="twitter:creator" content="@franminen" />
        <meta
          name="twitter:title"
          content="Superlista.ar | Armá tu lista para ir al super"
        />
        <meta
          name="twitter:description"
          content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/lista-super-app.appspot.com/o/assets%2FCover.jpg?alt=media&token=ee793dfc-5c61-4696-a9e1-4bfb9f439df1"
        />
      </Head>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
        <Toaster />
      </Layout>
      <Analytics />
    </>
  );
}
