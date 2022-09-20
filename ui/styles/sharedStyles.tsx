import styled from 'styled-components'

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

const StyledModalWrapper = styled.div`
    height: 100%;
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
`;

const ModalContainer = styled.div`
    background: var(--light);
    padding: 22px 0 12px 0;
    border-radius: 40px;
    max-width: 30em;
    width: 90%;
    margin: 0 auto;
`

export {
    MainContainer,
    SpacedContainer,
    StyledFooter,
    Title,
    StartContainer,
    CenterContainer,
    StyledModalWrapper,
    ModalContainer
}
