import { useState } from "react"
import styled from "styled-components"
import { useList, useProductsActions } from "~/lib/hooks"

const ConfirmClearButton = (props: any) => {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            Borrar lista?
        </button>
    )
}

const ConfirmClearButtonStyled = styled(ConfirmClearButton)`
    transition: all .4s;
    color: white;
    font-size: 16px;
    text-align: right;
    background-color: #8D8D8D;
    width: 10.3em;
    height: 52px;
    padding-right: 19px;
    position: fixed;
    left: 3%;
    bottom: 15%;
    z-index: 3;
    border-radius: 2em;
    opacity: ${props => (props.active ? "0" : "1")};
    transform: ${props => (props.active ? "scaleX(0)" : "scaleX(1)")};
    transform-origin: 0% 0%;
`;

const ClearButton = styled.button`
    background-color: var(--dark);
    padding: 0;
    width: 52px;
    height: 52px;
    border-radius: 100%;
    position: fixed;
    left: 3%;
    bottom: 15%;
    z-index: 4;
`

const ClearListButton = () => {
    const [active, setActive] = useState(true)
    const { clearList } = useProductsActions()
    const list = useList()

    return (
        <>
            {
                !!list.length ?
                    <>
                        <ClearButton onClick={() => setActive(!active)}>
                            <img
                                src="/assets/clear-icon.svg"
                                alt="Clear"
                                style={{ maxWidth: '42px', position: 'relative', top: '3px' }}
                            />
                        </ClearButton>
                        <ConfirmClearButtonStyled active={active} onClick={clearList}>
                            Borrar lista?
                        </ConfirmClearButtonStyled>
                    </> : null
            }

        </>
    )
}

export default ClearListButton
