import { ChangeEvent } from "react"

interface Props {
    searchTerm: string,
    setSearchTerm: (value: string) => void
}
const SearchProductInput = ({ searchTerm, setSearchTerm }: Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };

    return (
        <>
            <input
                type="text"
                placeholder="Buscar producto"
                value={searchTerm}
                onChange={handleChange}
            />
        </>
    )
}

export default SearchProductInput
