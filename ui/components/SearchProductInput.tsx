import styled from "styled-components"
import { useProductsActions, useUtils } from "~/lib/hooks";

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

interface Props {
    handleShowSearch: any,
    showSearch: boolean,
}

const SearchProductInput = ({ handleShowSearch, showSearch }: Props) => {
    const { handleSearch } = useProductsActions()
    const { searchValue } = useUtils()

    return (
        <>
            <InputContainer active={showSearch}>
                <button style={{ padding: '0 3px' }} onClick={handleShowSearch}>
                    <img style={{ maxWidth: '36px', marginRight: '8px' }} src="/assets/back-icon.svg" alt="Back" />
                </button>
                <SearchInput
                    type="text"
                    placeholder="Buscar producto"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </InputContainer>
        </>
    )
}

export default SearchProductInput
