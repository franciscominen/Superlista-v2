import styled from 'styled-components'

const MainContainer = styled.main`
    max-width: 750px;
    width: 100%;
    margin:  0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const CenterContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
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
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    padding: 0 3%;
`

export { MainContainer, SpacedContainer, StyledFooter, Title, CenterContainer }
