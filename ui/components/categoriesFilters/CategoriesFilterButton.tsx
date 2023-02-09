import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ShowCategoriesButton = styled.button<{ active: boolean }>`
  background-color: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed !important;
  left: 3%;
  bottom: 15vh;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s;
  transform: ${({ active }) =>
    active ? "translateX(0)" : "translateX(-15em)"};
  cursor: pointer;
`;

type Props = {
  onShowCategories: Function;
};

const CategoriesFilterButton = ({ onShowCategories }: Props) => {
  const [filterIconActive, setFilterIconActive] = useState<boolean>(false);

  const showFilterIcon = () => {
    window.scrollY > 80
      ? setFilterIconActive(true)
      : setFilterIconActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", showFilterIcon);
  }, []);

  return (
    <ShowCategoriesButton
      onClick={() => onShowCategories()}
      active={filterIconActive}
    >
      <Image
        src="/assets/icons/filter-icon.svg"
        alt="Filter"
        height={42}
        width={42}
        style={{ position: "relative", top: "3px" }}
      />
    </ShowCategoriesButton>
  );
};

export default CategoriesFilterButton;
