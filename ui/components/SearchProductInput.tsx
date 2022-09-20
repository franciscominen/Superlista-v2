import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components"
import { useProductsActions, useUtils } from "~/lib/hooks";
import { scaleInCenter } from "../styles/animations";

const InputContainer = styled.div<{ active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 85%;
    transition: all .2s;
    transform: ${({ active }) => active ? 'translateY(0)' : 'translateY(-100px)'};
`
const SearchInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #8d8d8d;
    padding: 4px 2px;
    font-size: 16px;
    font-family: var(--principalFont);
    &:focus {
        outline: none;
    } 
`

const ClearListButton = styled.button`
    background-color: #8d8d8d;
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    position: absolute;
    right: 0.2px;
    animation: ${scaleInCenter} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const ClearListImg = styled.img`
    max-width: 10px;
    filter: brightness(10);
    position: relative;
    top: .3px;
`

interface Props {
    handleShowSearch: any,
    showSearch: boolean,
}

const SearchProductInput = ({ handleShowSearch, showSearch }: Props) => {
    const { handleSearch, clearSearch } = useProductsActions()
    const { searchValue } = useUtils()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onBackSearch = () => {
        clearSearch()
        handleShowSearch()
    }

    const onClearSearch = () => {
        clearSearch()
        inputRef?.current?.focus()
    }

    return (
        <>
            <InputContainer active={showSearch}>
                <button style={{ padding: '0 3px', marginRight: '8px' }} onClick={onBackSearch}>
                    <Image src="/assets/back-icon.svg" alt="Back" width={36} height={36} />
                </button>
                <SearchInput
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar producto"
                    value={searchValue}
                    onChange={handleSearch}
                />

                {
                    searchValue ?
                        <ClearListButton onClick={onClearSearch}>
                            <ClearListImg
                                src="/assets/close-icon.svg"
                                alt="X"
                            />
                        </ClearListButton>
                        : null
                }

            </InputContainer>
        </>
    )
}

export default SearchProductInput
