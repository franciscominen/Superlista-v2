import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { scaleInCenter } from "~/ui/styles/animations";

interface Props {
  category: {
    id: Number;
    title: string;
    link: string;
    img: string;
  };
}

const CategoryButton = ({ category }: Props) => {
  const router = useRouter();
  const categoryQuery = router.query.slug;

  const { title, link, img } = category;

  let activeCategory: boolean | any;
  if (categoryQuery) {
    activeCategory = categoryQuery[0] === link;
  }

  const onClickCategory = () => {
    router.push({ pathname: `/productos/${link}` }, undefined, {
      shallow: true,
    });
  };

  const onCloseCategory = () => {
    router.push(`/productos`);
  };

  return (
    <>
      <CategoryBtn onClick={onClickCategory}>
        <CategoryImgContainer active={activeCategory}>
          {!activeCategory ? (
            <Image src={img} alt={title} width={42} height={42} />
          ) : (
            <CloseIcon onClick={onCloseCategory}>
              <Image
                src="/assets/icons/close-icon.svg"
                alt="X"
                width={14}
                height={14}
              />
            </CloseIcon>
          )}
        </CategoryImgContainer>
        <p style={{ margin: "6px 0 0 0", fontWeight: "400", fontSize: "13px" }}>
          {title}
        </p>
      </CategoryBtn>
    </>
  );
};

export default CategoryButton;

const CategoryBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const CategoryImgContainer = styled.div<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "#232323" : "#F6F6F6")};
  height: 60px;
  width: 60px;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 15px 15px 15px;
  transition: all 0.3s;
  cursor: pointer;
`;

const CloseIcon = styled.span`
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  animation: ${scaleInCenter} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  cursor: pointer;
`;
