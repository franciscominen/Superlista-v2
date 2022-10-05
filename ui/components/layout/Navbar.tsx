import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CategoriesNavbar from '../categoriesFilters/CategoriesNavbar'
import ShareMyListModal from '../modals/ShareMyListModal'
import OrderByCategoryButton from '../utils/OrderByCategoryButton'
import SearchProductInput from '../utils/SearchProductInput'
import { 
    Logo, 
    NavbarLink, 
    NavbarLinkAnimation, 
    NavContainer, 
    NavHeader, 
    NavLogoContainer, 
    SearchButton 
} from '~/ui/styles/navbarStyles'


interface Props {
    onShowCategories: (value: boolean) => void
    showCategories: boolean
    setShowCategories: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ onShowCategories, showCategories, setShowCategories }: Props) => {
    const router = useRouter()
    const isProducts = router.pathname === "/products/[[...slug]]"

    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [showNavbar, setShowNavbar] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<Number>(0);

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

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

                    <ShareMyListModal />
                    <Logo src="/assets/logo-navbar.svg" alt="Superlista.ar" show={showSearch} />
                    {
                        isProducts ?
                            <>
                                <SearchButton onClick={handleShowSearch} show={showSearch}>
                                    <Image src="/assets/icons/search-icon.svg" alt='Search' width={46} height={46} />
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

export default Navbar