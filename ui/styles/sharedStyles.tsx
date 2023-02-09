import styled from "styled-components";
import { fade, scaleInCenter } from "./animations";

const MainContainer = styled.main`
  background-color: white;
  max-width: 465px;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  margin: auto 0;
`;

const StartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const SpacedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

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
`;

const Title = styled.h1`
  font-size: 17px;
  font-weight: 800;
  width: 100%;
  padding: 0 3%;
`;

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
  overflow: hidden !important;
  transition: all 0.2s;
  opacity: ${({ exit }) => (exit ? "0" : "1")};
  animation: ${fade} 0.2s ease-in;
`;

const ModalContainer = styled.div<{ exit: boolean }>`
  background: var(--light);
  padding: 22px 0;
  border-radius: 40px;
  max-width: 27em;
  width: 90%;
  margin: 0 auto;
  position: relative;
  bottom: 3em;
  animation: ${scaleInCenter} 0.2s ease-in;
  transition: all 0.2s ease-in;
  transform: ${({ exit }) => (exit ? "scale(0)" : "scale(1)")};
`;

const HomeButton = styled.button`
  background-color: var(--white);
  border: 1px solid #d2d2d2;
  border-radius: 20px;
  min-width: 160px;
  max-width: 185px;
  width: 100%;
  min-height: 160px;
  max-height: 185px;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: all 0.2s;
  animation: ${fade} 0.3s ease-in 1.3s forwards;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--dark);
  }
`;

const HomeText = styled.p`
  font-size: 15px;
  margin: 8px 0 0 0;
`;

const Strong = styled.strong`
  font-weight: 600;
`;

const ModalButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  background-color: var(--white);
  color: #8d8d8d;
  padding: 16px 16px;
  border-radius: 22px;
  border: 3px solid #d2d2d2;
  display: block;
  opacity: 0;
  animation: ${fade} 0.3s forwards;
  cursor: pointer;
`;

export {
  MainContainer,
  HomeContainer,
  SpacedContainer,
  StyledFooter,
  Title,
  StartContainer,
  CenterContainer,
  StyledModalWrapper,
  ModalContainer,
  HomeButton,
  HomeText,
  Strong,
  ModalButton,
};
