import styled from 'styled-components'
import { fade, scaleInCenter } from './animations'

const MainContainer = styled.main`
    max-width: 750px;
    width: 100%;
    margin:  0 auto;
    padding: 7em 0 2.5em 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const StartContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    text-align: center;
`

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;
`

const SpacedContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`

const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--dark);
    color: var(--light);
    font-size: 10px;
    padding: 8px 0;
    text-align: center;
    z-index: 10000;
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    padding: 0 3%;
`

const StyledModalWrapper = styled.div<{ exit: boolean }>`
    height: 100vh;
    width: 100%;
    background: #00000055;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden!important;
    transition: all .2s;
    opacity: ${({ exit }) => exit ? '0' : '1'};;
    animation: ${fade} .2s ease-in; 
`;

const ModalContainer = styled.div<{ exit: boolean }>`
    background: var(--light);
    padding: 22px 0 12px 0;
    border-radius: 40px;
    max-width: 30em;
    width: 90%;
    margin: 0 auto;
    animation: ${scaleInCenter} .2s ease-in;
    transition: all .2s ease-in;
    transform: ${({ exit }) => exit ? 'scale(0)' : 'scale(1)'};
`

const HomeButton = styled.button`
  background-color: var(--white);
  border: 2px solid #D2D2D2;
  border-radius: 20px;
  min-width: 160px;
  max-width: 185px;
  width: 100%;
  min-height: 160px;
  max-height: 185px;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  animation: ${fade} 0.3s ease-in 2.1s forwards;
`

const HomeText = styled.p`
  font-size: 15px;
  margin: 8px 0 0 0;
`

export {
    MainContainer,
    SpacedContainer,
    StyledFooter,
    Title,
    StartContainer,
    CenterContainer,
    StyledModalWrapper,
    ModalContainer,
    HomeButton,
    HomeText
}
