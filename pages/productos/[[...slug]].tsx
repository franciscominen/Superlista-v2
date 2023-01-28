import { NextPage } from "next";

import { IProduct } from "~/lib/types";
import styled from "styled-components";

import ProductCard from "~/ui/components/cards/ProductCard";
import CategoriesCollapse from "~/ui/components/categoriesFilters/CategoriesCollapse";
import { Title } from "~/ui/styles/sharedStyles";
import ProductNotFound from "~/ui/components/utils/ProductNotFound";
import { useListStore } from "~/lib/store/state";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import useProductsActions from "~/lib/store/actions/useProductsActions";

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 3%;
  grid-row-gap: 8px;
  padding: 0 3%;
  gap: 8px;
  width: 100%;
  transition: all 0.5s;
`;

const Products: NextPage = () => {
  const { fetchProducts } = useProductsActions();

  const { products, isLoading } = useListStore(
    (state) => ({
      products: state.PRODUCTS,
      isLoading: state.IS_LOADING,
    }),
    shallow
  );

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);

  /*   const { searchValue } = useUtils();

  const router = useRouter();
  const categoryQuery: string | string[] | undefined = router.query.slug;

  products = !searchValue
    ? products
    : products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );

  if (categoryQuery) {
    products = products.filter((product) => {
      return product.categoryID === categoryQuery[0];
    });
  } */

  return (
    <main style={{ padding: "7em 0 2.5em 0", width: "100%" }}>
      <CategoriesCollapse />

      <figure
        style={{
          background: "#f5f5f5",
          height: "1px",
          width: "95%",
          margin: "8px auto 0 auto",
        }}
      />

      <Title>Productos</Title>

      <ProductsContainer>
        {isLoading ? (
          <h2>Cargando...</h2>
        ) : (
          products.map((product: IProduct) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </ProductsContainer>
      {!products.length ? <ProductNotFound /> : null}
    </main>
  );
};

export default Products;
