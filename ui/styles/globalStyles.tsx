import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "IBM Plex Sans";
      src: url("/assets/fonts/IBMPlexSans-Regular.ttf");
    }

    :root {
        --dark: #232323;
        --light: #fff;
        --white: #F6F6F6;
    }
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: var(--principalFont);
        background-color: var(--light);
        font-family: "IBM Plex Sans";
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
        font-family: "IBM Plex Sans";
    }
    button {
        background: none;
        border: none;
    }
`

export default GlobalStyle