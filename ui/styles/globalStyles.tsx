import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "IBM Plex Sans";
      src: url("/assets/fonts/IBMPlexSans-Regular.ttf");
    }
    @font-face {
      font-family: "IBM Plex Sans Bold";
      src: url("/assets/fonts/IBMPlexSans-SemiBold.ttf");
    }

    :root {
        --dark: #232323;
        --light: #fff;
        --white: #F6F6F6;
        --gray: #D2D2D2;
        --darkgrey: #8D8D8D;
        --principalFont: "IBM Plex Sans";
        --boldFont: "IBM Plex Sans Bold";
    }

    html,
    body {
        background-image: url("/assets/background.svg");
        background-size: auto;
        padding: 0;
        margin: 0;
        font-family: var(--principalFont);
        background-color: var(--light);
        overflow-x: hidden;
        ::-webkit-scrollbar {
            background-color: var(--gray);
            width: 12px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: var(--darkgrey);
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
    }

    // Toast
    .toast-text {
        margin: 4px 0;
        font-size: 16px;
    }
    .toast-text-link {
        font-size: 18px;
        color: var(--dark);
        font-family: var(--boldFont);
        margin: 4px 0;
        padding: 0 12px;
    }

`

export default GlobalStyle