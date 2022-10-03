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
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
`

const slideInBottom = keyframes`
  0% {
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
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
