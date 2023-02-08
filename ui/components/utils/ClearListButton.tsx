import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { scaleInCenter } from "../../styles/animations";
import useListActions from "~/lib/store/actions/useListActions";
import { useListStore } from "~/lib/store/state";

const ConfirmClearButton = (props: any) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      ¿Borrar lista?
    </button>
  );
};

const ConfirmClearButtonStyled = styled(ConfirmClearButton)`
  transition: all 0.4s;
  color: white;
  font-size: 16px;
  text-align: right;
  background-color: #8d8d8d;
  width: 10.8em;
  height: 52px;
  padding-right: 19px;
  position: fixed;
  left: 3%;
  bottom: 15%;
  z-index: 3;
  border-radius: 2em;
  opacity: ${(props) => (props.active ? "0" : "1")};
  transform: ${(props) => (props.active ? "scaleX(0)" : "scaleX(1)")};
  transform-origin: 0% 0%;
  cursor: pointer;
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
  animation: ${scaleInCenter} 0.3s ease both;
  cursor: pointer;
`;

const ClearListButton = () => {
  const LIST = useListStore((state) => state.LIST);

  const { clearList } = useListActions();
  const [active, setActive] = useState<boolean>(true);

  return (
    <>
      {LIST.length ? (
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
        </>
      ) : null}
    </>
  );
};

export default ClearListButton;
