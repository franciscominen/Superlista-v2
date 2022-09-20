import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"
import { scaleInCenter } from "../styles/animations"

interface Props {
    category: {
        id: Number,
        title: string,
        link: string,
        img: string
    }
}

const CategoryBtn = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
`

const CategoryImgContainer = styled.div<{ active: boolean }>`
    background-color: ${({ active }) => active ? "#232323" : "#F6F6F6"};
    height: 60px;
    width: 60px;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 15px 15px 15px;
    transition: all .3s;
`

const CloseIcon = styled.span`
    background-color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    animation: ${scaleInCenter} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`

const CategoryButton = ({ category }: Props) => {
    const router = useRouter()
    const categoryQuery = router.query.slug

    const { title, link, img } = category

    let activeCategory: boolean | any;
    if (categoryQuery) {
        activeCategory = categoryQuery[0] === link
    }

    const onClickCategory = () => {
        router.push({ pathname: `/products/${link}` }, undefined, { shallow: true })
    }

    const onCloseCategory = () => {
        router.push(`/products`)
    }

    return (
        <>
            <CategoryBtn onClick={onClickCategory}>
                <CategoryImgContainer active={activeCategory}>
                    {
                        !activeCategory
                            ? <Image src={img} alt={title} width={42} height={42} />
                            : (
                                <CloseIcon onClick={onCloseCategory}>
                                    <Image
                                        src="/assets/close-icon.svg"
                                        alt="X"
                                        width={14}
                                        height={14}
                                    />
                                </CloseIcon>
                            )
                    }
                </CategoryImgContainer>
                <p style={{ margin: '6px 0 0 0' }}>{title}</p>
            </CategoryBtn>
        </>
    )
}

export default CategoryButton
