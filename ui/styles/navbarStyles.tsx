import styled from "styled-components"

const NavHeader = styled.header<{ isVisible: boolean }>`
    height: auto;
    max-width: 465px;
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
    cursor: pointer;
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
    cursor: pointer;
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

export {
    NavHeader,
    NavLogoContainer,
    SearchButton,
    Logo,
    NavContainer,
    NavbarLink,
    NavbarLinkAnimation
}
