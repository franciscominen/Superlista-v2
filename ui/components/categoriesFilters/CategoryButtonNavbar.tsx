import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"

interface Props {
    category: {
        id: Number,
        title: string,
        link: string,
        img: string
    }
    onShowCategories: Function
}

const CategoryButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 12px;
    background-color: white;
    border-radius: 0 15px 15px 15px;
    cursor: pointer;
`

const CategoryButtonNavbar = ({ category, onShowCategories }: Props) => {
    const router = useRouter()
    const { title, link, img } = category

    const onFilterByCategory = () => {
        router.push({ pathname: `/productos/${link}` }, undefined, { shallow: true })
        onShowCategories()
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <>

            <CategoryButton onClick={onFilterByCategory}>
                <Image src={img} alt={title} width={42} height={42} />
                <p style={{ fontSize: '18px' }}>{title}</p>
            </CategoryButton>

        </>
    )
}

export default CategoryButtonNavbar
