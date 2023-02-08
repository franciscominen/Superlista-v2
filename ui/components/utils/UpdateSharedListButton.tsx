import Image from "next/image";
import styled from "styled-components";
import useListActions from "~/lib/store/actions/useListActions";
import { useListStore } from "~/lib/store/state";
import showToast from "./Toast";

const UpdateButton = styled.button<{ active: boolean }>`
  background-color: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed !important;
  left: 3%;
  bottom: 21.5%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s;
  cursor: pointer;
  transform: ${({ active }) =>
    active ? "translateX(0)" : "translateX(-15em)"};
`;

const UpdateSharedListButton = () => {
  const IS_LIST_UPDATED = useListStore((state) => state.IS_LIST_UPDATED);
  const SHARED_LIST_ID = useListStore((state) => state.SHARED_LIST_ID);
  const { updateListShared } = useListActions();

  const onUpdateList = () => {
    updateListShared(SHARED_LIST_ID);
    showToast(
      <p style={{ margin: "5px 0" }}>Actualizaste tu lista compartida.</p>
    );
    return useListStore.setState((state) => ({
      ...state,
      IS_LIST_UPDATED: false,
    }));
  };

  return (
    <>
      <UpdateButton active={IS_LIST_UPDATED} onClick={onUpdateList}>
        <Image
          priority
          src="/assets/icons/refresh-icon.svg"
          alt="Superlista.ar"
          width={42}
          height={42}
        />
      </UpdateButton>
    </>
  );
};

export default UpdateSharedListButton;
