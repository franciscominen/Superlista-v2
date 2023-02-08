import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainContainer } from "../../styles/sharedStyles";
import CategoriesFilterButton from "../categoriesFilters/CategoriesFilterButton";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UpdateSharedListButton from "../utils/UpdateSharedListButton";
import { useListStore } from "~/lib/store/state";
/* import useListActions from "~/lib/store/actions/useListActions";
import showToast from "../utils/Toast"; */

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const LIST = useListStore((state) => state.LIST);
  // const SHARED_LIST_ID = useListStore((state) => state.SHARED_LIST_ID);
  // const { updateListShared } = useListActions();

  const router = useRouter();
  const isHome = router.route === "/";
  const isHowToUse = router.route === "/comousarla";
  const isProducts = router.route === "/productos/[[...slug]]";

  // const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const onShowCategories = () => {
    setShowCategories(!showCategories);
  };

  /*   const onUpdateList = () => {
    updateListShared(SHARED_LIST_ID);
    setIsUpdate(false);
    showToast(<p style={{margin: '5px 0'}}>Actualizaste tu lista compartida.</p>)
  }; */

  useEffect(() => {
    /*     if (SHARED_LIST_ID) {
      setIsUpdate(true);
    }
 */
    if (!LIST.length) {
      useListStore.setState((state) => ({ ...state, IS_LIST_UPDATED: false }));
    }
  }, [LIST.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isHome || isHowToUse ? null : (
        <Navbar
          onShowCategories={onShowCategories}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
        />
      )}

      {isProducts ? (
        <CategoriesFilterButton onShowCategories={onShowCategories} />
      ) : null}

      <UpdateSharedListButton />

      <MainContainer {...props}>{children}</MainContainer>
      <Footer />
    </div>
  );
};

export default Layout;
