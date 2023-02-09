import showToast from "~/ui/components/utils/Toast";
import { useListStore } from "../store/state";
import { IProduct } from "../types";
import useProductsActions from "../store/actions/useProductsActions";
import { Strong } from "~/ui/styles/sharedStyles";

const useCreateNewProduct = (
  createdProduct: IProduct,
  closeModal: () => void
) => {
  const PRODUCTS = useListStore((state) => state.PRODUCTS);
  const { addProductToList, clearSearch } = useProductsActions();

  const productExist = PRODUCTS.some(
    (product) =>
      product.name.toLowerCase() === createdProduct.name.toLowerCase()
  );

  const toastMessage = () => {
    return productExist ? (
      <p className="toast-text">Este producto ya existe.</p>
    ) : (
      <p className="toast-text">
        Agregaste <Strong>{createdProduct.name}</Strong> a tu lista.
      </p>
    );
  };

  const onCreateNewProduct = (e: any) => {
    e.preventDefault();

    if (productExist) {
      showToast(toastMessage);
    } else {
      addProductToList(createdProduct);
      closeModal();
      showToast(toastMessage);
      setTimeout(() => {
        clearSearch();
      }, 1100);
    }
  };

  return {
    onCreateNewProduct,
  };
};

export default useCreateNewProduct;
