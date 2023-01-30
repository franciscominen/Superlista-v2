import { useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import { scaleInCenter } from "../../styles/animations";
import { SearchButton } from "~/ui/styles/navbarStyles";
import useProductsActions from "~/lib/store/actions/useProductsActions";
import { useListStore } from "~/lib/store/state";

interface Props {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchProductInput = ({ showSearch, setShowSearch }: Props) => {
  const { handleSearch, clearSearch } = useProductsActions();
  const searchValue = useListStore((state) => state.SEARCH_VALUE);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
    inputRef?.current?.focus();
  };

  const onBackSearch = () => {
    clearSearch();
    handleShowSearch();
  };

  const onClearSearch = () => {
    clearSearch();
    inputRef?.current?.focus();
  };

  return (
    <>
      <SearchButton onClick={handleShowSearch} show={showSearch}>
        <Image
          src="/assets/icons/search-icon.svg"
          alt="Search"
          width={46}
          height={46}
        />
      </SearchButton>

      <SearchContainer active={showSearch}>
        <InputContainer>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Buscar producto"
            value={searchValue}
            onChange={handleSearch}
            maxLength={25}
          />

          {searchValue ? (
            <ClearSearchButton onClick={onClearSearch}>
              <ClearListImg src="/assets/icons/close-icon.svg" alt="X" />
            </ClearSearchButton>
          ) : null}
        </InputContainer>

        <BackButton onClick={onBackSearch}>
          <Image
            src="/assets/icons/back-icon.svg"
            alt="Back"
            width={36}
            height={36}
          />
        </BackButton>
      </SearchContainer>
    </>
  );
};

export default SearchProductInput;

const SearchContainer = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 8px 0;
  right: 2%;
  width: 85%;
  transition: all 0.2s;
  transform: ${({ active }) =>
    active ? "translateY(0)" : "translateY(-100px)"};
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--darkgrey);
  padding-bottom: 1px;
  width: 80%;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-family: var(--principalFont);
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const ClearSearchButton = styled.button`
  background-color: #8d8d8d;
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  animation: ${scaleInCenter} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const ClearListImg = styled.img`
  max-width: 10px;
  filter: brightness(10);
  position: relative;
  top: 0.3px;
`;

const BackButton = styled.button`
  transform: rotate(180deg);
  cursor: pointer;
  margin: 0;
  padding: 0 12px 0 0;
`;
