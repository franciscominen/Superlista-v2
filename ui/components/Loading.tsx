import Image from "next/image";
import styled from "styled-components";
import { slideLeft } from "../styles/animations";

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #F6F6F6;
  overflow: hidden;
`

const ProductsWrapper = styled.div`
  width: 45em;
  height: 6em;
  padding-bottom: 2px;
  background-image: url('/assets/loader/products.svg');
  background-size: cover;
  animation: ${slideLeft} 3s linear infinite both;
`
const WheelsWrapper = styled.div`
  padding: 0 5px;
`

const Loading = () => (
  <>
    <MainContainer>
      <ProductsWrapper />
      <WheelsWrapper>
        <Image priority src='/assets/loader/wheels.svg' layout="responsive" width={700} height={200} />
      </WheelsWrapper>
    </MainContainer>
  </>
);

export default Loading;