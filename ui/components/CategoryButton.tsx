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

const CategoryImgContainer = styled.div<{ active: boolean }>`
    background-color: ${({ active }) => active ? "#232323" : "#F6F6F6"};
    min-height: 70px;
    min-width: 70px;
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

    const { id, title, link, img } = category

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
            <button onClick={onClickCategory}>
                <div>
                    <CategoryImgContainer active={activeCategory}>
                        {
                            !activeCategory
                                ? <img src={img} alt={title} style={{ maxWidth: '40px' }} />
                                : (
                                    <CloseIcon onClick={onCloseCategory}>
                                        <img
                                            src="/assets/close-icon.svg"
                                            alt="X"
                                            style={{ maxWidth: '12px' }}
                                        />
                                    </CloseIcon>
                                )
                        }
                    </CategoryImgContainer>
                    <p style={{margin: '6px 0 0 0'}}>{title}</p>
                </div>
            </button>
        </>
    )
}

export default CategoryButton
