import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { MainContainer } from "../../styles/sharedStyles";
import CategoriesFilterButton from "../categoriesFilters/CategoriesFilterButton";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  const router = useRouter();
  const isHome = router.route === "/";
  const isHowToUse = router.route === "/comousarla";
  const isProducts = router.route === "/productos/[[...slug]]";
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const onShowCategories = () => {
    setShowCategories(!showCategories);
  };

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

      <MainContainer {...props}>{children}</MainContainer>
      <Footer />
    </div>
  );
};

export default Layout;
