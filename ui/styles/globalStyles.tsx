import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --dark: #232323;
        --light: #F5F5F5;
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
`

export default GlobalStyle