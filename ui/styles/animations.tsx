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
const slideLeft = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
`

export {
    scaleInCenter,
    slideLeft
}
