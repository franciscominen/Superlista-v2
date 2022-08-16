import styled from 'styled-components'

const MainContainer = styled.main`
    min-height: 100vh;
    max-width: 750px;
    width: 100%;
    margin:  0 auto;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
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

export { MainContainer, Container, StyledFooter }
