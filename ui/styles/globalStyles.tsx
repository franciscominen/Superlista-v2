import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --dark: #232323;
        --light: #fff;
        --white: #F6F6F6;
        --principalFont: 'IBM Plex Sans', sans-serif;
    }
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: var(--principalFont);
        background-color: var(--light);
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    * {
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6, p, a {
        color: var(--dark);
    }
    button {
        background: none;
        border: none;
    }
`

export default GlobalStyle