import { useState } from "react"
import Image from "next/image"
import { useList, useProductsActions } from "~/lib/hooks"
import styled from "styled-components"
import { scaleInCenter } from "../../styles/animations"

const ConfirmClearButton = (props: any) => {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            ¿Borrar lista?
        </button>
    )
}

const ConfirmClearButtonStyled = styled(ConfirmClearButton)`
    transition: all .4s;
    color: white;
    font-size: 16px;
    text-align: right;
    background-color: #8D8D8D;
    width: 10.8em;
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
    padding: 5px 0 0 0;
    width: 52px;
    height: 52px;
    border-radius: 100%;
    position: fixed;
    left: 3%;
    bottom: 15%;
    z-index: 4;
    animation: ${scaleInCenter} .3s ease both;
`

const ClearListButton = () => {
    const list = useList()
    const { clearList } = useProductsActions()
    const [active, setActive] = useState<boolean>(true)

    return (
        <>
            {
                !!list.length ?
                    <>
                        <ClearButton onClick={() => setActive(!active)}>
                            <Image
                                src="/assets/icons/clear-icon.svg"
                                alt="Clear"
                                width={42}
                                height={42}
                            />
                        </ClearButton>
                        <ConfirmClearButtonStyled active={active} onClick={clearList} />
                    </> : null
            }

        </>
    )
}

export default ClearListButton