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
        --gray: #D2D2D2;
        --principalFont: "IBM Plex Sans";
    }
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: var(--principalFont);
        background-color: var(--light);
        font-family: var(--principalFont);
        overflow-x: hidden;
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
        font-family: var(--principalFont);
    }
    button {
        background: none;
        border: none;
    }

    // Toast
    .toast-text {
        margin: 4px 0;
        font-size: 16px;
    }

`

export default GlobalStyle