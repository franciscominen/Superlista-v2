import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Navbar = () => {
    const router = useRouter()
    const isActiveLink = router.pathname === '/products'

    return (
        <>
            <NavHeader>
                <NavLogoContainer>
                    <img src="/assets/search-icon.svg" alt="" />
                    <h1><strong>Superlista</strong>.ar</h1>
                    <img src="/assets/share-icon.svg" alt="" />
                </NavLogoContainer>
                <NavContainer>
                    <Link href='/products'>
                        <a className={isActiveLink ? 'nav-linkActive' : 'nav-link'}>PRODUCTOS</a>
                    </Link>
                    <figure></figure>
                    <Link href='/mylist' >
                        <a className={isActiveLink ? 'nav-link' : 'nav-linkActive'}>MI LISTA</a>
                    </Link>
                </NavContainer>
            </NavHeader>

            <style jsx>{`
                h1 {
                    font-size: 18px;
                }
                img {
                    max-width: 42px;
                }
                figure {
                    margin: 0;
                    width: 1px;
                    height: 2em;
                    background-color: #cfcfcf;
                }
                .nav-link {
                    width: 10em;
                    text-align: center;
                }
                .nav-linkActive {
                    width: 10em;
                    text-align: center;
                    font-weight: bold;
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
}

export default Navbar;

const NavHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--white);
    border-radius: 0 0 35px 35px;
`

const NavLogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const NavContainer = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
`
