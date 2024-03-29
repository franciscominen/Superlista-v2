import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --dark: #232323;
        --light: #fff;
        --white: #F6F6F6;
        --gray: #D2D2D2;
        --darkgrey: #8D8D8D;
        --principalFont: 'IBM Plex Sans', sans-serif;
    }

   /*  html, */
    body {
        background-image: url("/assets/background.svg");
        background-size: auto;
        padding: 0;
        margin: 0;
        font-family: var(--principalFont);
        background-color: var(--light);
        overflow-x: hidden;
        overflow-y: overlay;
        ::-webkit-scrollbar {
            opacity: 0;
            width: 12px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #2323239b;
            border-radius: 12px;
        }
        user-select: none;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6, p, a, button {
        color: var(--dark);
        //font-family: var(--principalFont);
    }
    button {
        background: none;
        border: none;
        font-family: var(--principalFont);
    }

    // Toast
    .toast-text {
        margin: 4px 0;
        font-size: 16px;
    }
    .toast-text-link {
        font-size: 18px;
        color: var(--dark);
        font-weight: 600;
        margin: 4px 0;
        padding: 0 12px;
    }

`

export default GlobalStyle