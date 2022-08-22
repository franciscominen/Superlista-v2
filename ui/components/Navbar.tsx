import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from 'styled-components';

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
    padding: 4px;
`

const NavContainer = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
`

const NavbarLink = styled.a<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10em;
    text-align: center;
    transition: all .1s;
    font-weight: ${({ active }) => active ? "0" : "bold"};
`
const NavbarLinkAnimation = styled.figure<{ active: boolean }>`
    height: 2.5px;
    width: 6em;
    margin: 0;
    padding: 0;
    background: var(--dark);
    border-radius: 2px;
    transition: all .2s;
    transform: ${({ active }) => active ? "scaleX(0)" : "scaleX(1)"};
`

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
                        <NavbarLink active={!isActiveLink}>
                            <p>PRODUCTOS</p>
                            <NavbarLinkAnimation active={!isActiveLink}></NavbarLinkAnimation>
                        </NavbarLink>
                    </Link>
                    <figure></figure>
                    <Link href='/mylist' >
                        <NavbarLink active={isActiveLink}>
                            <p>MI LISTA</p>
                            <NavbarLinkAnimation active={isActiveLink}></NavbarLinkAnimation>
                        </NavbarLink>
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
                p {
                    margin: 0;
                    padding: 0 0 2px 0;
                    font-size: 18px;
                }
            `}</style>
        </>
    );
}

export default Navbar;
