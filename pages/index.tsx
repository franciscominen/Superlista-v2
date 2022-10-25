import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import ClearListModal from '~/ui/components/modals/ClearListModal'
import { useList } from '~/lib/hooks'
import { HomeButton, HomeText, SpacedContainer, HomeContainer, Strong } from '~/ui/styles/sharedStyles'
import { fade, homeLogoMove } from '~/ui/styles/animations'

const ImageWrapper = styled.div`
  position: absolute;
  transform: translateY(-6em);
  opacity: 0;
  width: 250px;
  max-width: 250px;
  height: 50px;
  max-height: 50px;
  animation: ${fade} 0.3s ease-in 0.5s forwards, ${homeLogoMove} .5s ease 1s forwards;
`

const HowToUseLink = styled.h3`
  font-size: 18px;
  color: var(--darkgrey);
  opacity: 0;
  animation: ${fade} 0.4s ease 1.7s forwards;
  cursor: pointer;
  transition: all .1s;
  &:hover {
    color: var(--dark);
  }
`

const Home: NextPage = () => {
  const list = useList()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Superlista.ar</title>
        <meta name="description" content="Con Superlista.ar podes armar de forma rápida y sencilla, tu lista para ir al supermercado." />
        <link rel="icon" href="/favicon.png" />
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

      <HomeContainer>
        <ImageWrapper>
          <Image
            priority
            src='/assets/logo-navbar.svg'
            alt='Superlista.ar'
            layout="responsive"
            width={250}
            height={50}
          />
        </ImageWrapper >

        <SpacedContainer style={{ marginBottom: '20px', position: 'relative', bottom: '.5em' }}>
          {
            !list.length ?
              (
                <HomeButton onClick={() => { router.push('/productos') }}>
                  <Image
                    src="/assets/icons/new-list-btn.svg"
                    alt='+'
                    width={78}
                    height={78}
                  />
                  <HomeText><Strong>Crear nueva</Strong> Lista</HomeText>
                </HomeButton>
              )
              :
              <ClearListModal />
          }
          <HomeButton onClick={() => { router.push('/lista') }}>
            <Image
              src="/assets/icons/continue-btn.svg"
              alt='>'
              width={78}
              height={78}
            />
            <HomeText><Strong>Continuar</Strong> Lista</HomeText>
          </HomeButton>
        </SpacedContainer>

        <Link href='/comousarla'>
          <HowToUseLink>¿Cómo usarla?</HowToUseLink>
        </Link>
      </HomeContainer>
    </>
  )
}

export default Home
