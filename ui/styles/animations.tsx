import { keyframes, css } from "styled-components"

const slideInLeftEntrance = keyframes`
    0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
    }
    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
`
const slideInLeftIn = css`
    animation: ${slideInLeftEntrance} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const slideInLeftExit = keyframes`
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
    }
`
const slideInLeftOut = css`
    animation: ${slideInLeftExit} 0.4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`
export {
    slideInLeftIn,
    slideInLeftOut
}
