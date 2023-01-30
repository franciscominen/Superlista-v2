import { NextPage } from "next";
import { IProduct } from "~/lib/types";
import styled from "styled-components";

import ProductListCard from "~/ui/components/cards/ProductListCard";
import ClearListButton from "~/ui/components/utils/ClearListButton";
import EmptyList from "~/ui/components/utils/EmptyList";
import { useListStore } from "~/lib/store/state";

const MyListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 7.5em 3% 3em 3%;
  transition: 0.5s;
`;

const MyList: NextPage = () => {
  const LIST = useListStore((state) => state.LIST);

  return (
    <>
      {!LIST.length ? (
        <EmptyList />
      ) : (
        <MyListWrapper>
          {LIST.map((product: IProduct) => {
            return <ProductListCard key={product.name} product={product} />;
          }).reverse()}
        </MyListWrapper>
      )}
      <ClearListButton />
    </>
  );
};

export default MyList;
