import styled from "styled-components";
import { loadingAnimation } from "../../styles/animations";

const LoadingWrapper = styled.div`
  background-image: url("/assets/background.svg");
  background-size: auto;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F6F6F6;
  overflow-y: hidden;
`

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 465px;
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
  animation: ${loadingAnimation} 3s linear infinite both;
`

const Loading = () => (
  <>
    <LoadingWrapper>
      <MainContainer>
        <ProductsWrapper />
        <img src='/assets/loader/wheels.svg' alt='wheels' className="wheels" />
      </MainContainer>
    </LoadingWrapper>

    <style jsx>{`
      .wheels {
        max-width: 465px;
        object-fit: contain;
        padding: 1px 4px 0 4px;
      }
    `}</style>
  </>
);

export default Loading
