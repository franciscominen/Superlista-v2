import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />

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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
