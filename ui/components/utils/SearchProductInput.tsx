import { useRef } from "react"
import Image from "next/image"
import { useProductsActions, useUtils } from "~/lib/hooks"
import styled from "styled-components"
import { scaleInCenter } from "../../styles/animations"

const SearchContainer = styled.div<{ active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding: 8px 0;
    right: 2%;
    width: 85%;
    transition: all .2s;
    transform: ${({ active }) => active ? 'translateY(0)' : 'translateY(-100px)'};
`

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid var(--darkgrey);
    padding-bottom: 4px;
`

const SearchInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 16px;
    font-family: var(--principalFont);
    &:focus {
        outline: none;
    } 
`

const ClearSearchButton = styled.button`
    background-color: #8d8d8d;
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    
    animation: ${scaleInCenter} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const ClearListImg = styled.img`
    max-width: 10px;
    filter: brightness(10);
    position: relative;
    top: .3px;
`

const BackButton = styled.button`
    transform: rotate(180deg);
    cursor: pointer;
    margin: 0;
    padding: 0 12px 0 0;
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

                    {
                        searchValue ?
                            <ClearSearchButton onClick={onClearSearch}>
                                <ClearListImg
                                    src="/assets/icons/close-icon.svg"
                                    alt="X"
                                />
                            </ClearSearchButton>
                            : null
                    }
                </InputContainer>

                <BackButton onClick={onBackSearch}>
                    <Image src="/assets/icons/back-icon.svg" alt="Back" width={36} height={36} />
                </BackButton>

            </SearchContainer>
        </>
    )
}

export default SearchProductInput
