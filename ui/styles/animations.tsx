import { keyframes } from "styled-components"

const scaleInCenter = keyframes`
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
`

export {
    scaleInCenter
}
