import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useList } from '~/lib/hooks';
import CategoriesNavbar from './CategoriesNavbar';
import OrderByCategoryButton from './OrderByCategoryButton';
import SearchProductInput from './SearchProductInput';

const NavHeader = styled.header<{ isVisible: boolean }>`
    height: 112px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    border-bottom: 6px solid white;
    width: 100%;
    background-color: var(--white);
    border-radius: 0 0 35px 35px;
    position: fixed;
    top: 0;
    z-index: 15;
    transition: all .2s;
    transform: ${({ isVisible }) => isVisible ? 'translateY(0)' : 'translateY(-2.7em)'};
`

const NavLogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 4px;
`
const SearchButton = styled.button<{ show: boolean }>`
    padding: 0;
    transition: all .3s;
    transform: ${({ show }) => show ? 'translateY(-100px)' : 'translateY(0)'};
`

const Logo = styled.img<{ show: boolean }>`
    max-width: 110px;
    transition: all .3s;
    transform: ${({ show }) => show ? 'translateY(-100px)' : 'translateY(0)'};
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
    transition: all .2s;
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

interface Props {
    onShowCategories: (value: boolean) => void
    showCategories: boolean
    setShowCategories: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ onShowCategories, showCategories, setShowCategories }: Props) => {
    const router = useRouter()
    const isProducts = router.pathname === "/products/[[...slug]]"
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    const onGoToMyList = () => {
        setShowCategories(false)
        setShowSearch(false)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <>
            <NavHeader isVisible={showNavbar}>

                <NavLogoContainer>

                    <Image src="/assets/share-icon.svg" alt="Share" width={42} height={42} />
                    <Logo src="/assets/logo-navbar.svg" alt="Superlista.ar" show={showSearch} />
                    {
                        isProducts ?
                            <>
                                <SearchButton onClick={handleShowSearch} show={showSearch}>
                                    <Image src="/assets/search-icon.svg" alt='Search' width={46} height={46} />
                                </SearchButton>
                                <SearchProductInput handleShowSearch={handleShowSearch} showSearch={showSearch} />
                            </>
                            : <OrderByCategoryButton />
                    }

                </NavLogoContainer>

                <NavContainer>
                    <Link href='/products'>
                        <NavbarLink active={!isProducts}>
                            <p>PRODUCTOS</p>
                            <NavbarLinkAnimation active={!isProducts}></NavbarLinkAnimation>
                        </NavbarLink>
                    </Link>
                    <figure></figure>
                    <Link href='/mylist' >
                        <NavbarLink active={isProducts} onClick={onGoToMyList}>
                            <p>MI LISTA</p>
                            <NavbarLinkAnimation active={isProducts}></NavbarLinkAnimation>
                        </NavbarLink>
                    </Link>
                </NavContainer>

                <CategoriesNavbar onShowCategories={onShowCategories} showCategories={showCategories} />

            </NavHeader>

            <style jsx>{`
                h1 {
                    font-size: 18px;
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
