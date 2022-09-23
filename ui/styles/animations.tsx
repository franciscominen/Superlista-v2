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
const loadingAnimation = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
`

const slideLeft = keyframes`
  0% {
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
`

const slideInBottom = keyframes`
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
`

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const homeLogoMove = keyframes`
  100% {
    transform: translateY(-11em);
  }
`

export {
  scaleInCenter,
  loadingAnimation,
  fade,
  homeLogoMove,
  slideLeft,
  slideInBottom
}
