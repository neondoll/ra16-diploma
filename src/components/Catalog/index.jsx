import Cards from "../Cards";
import Categories from "./Categories";
import LoadBtn from "./LoadBtn";
import Paths from "../../paths";
import Preloader from "../Preloader";
import SearchForm from "./SearchForm";
import { fetchCategories, selectCategoriesLoading, setCurrentCategoryId } from "../../slices/categories";
import { fetchProducts, selectProducts, setProductQuery } from "../../slices/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Catalog() {
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const dispatch = useDispatch();
  const { pathname: locationPathname, state: locationState } = useLocation();
  const { error, items, loading: productsLoading } = useSelector(selectProducts);

  const isCatalogPath = locationPathname === Paths.CATALOG;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(0));

    return () => {
      if (isCatalogPath) {
        dispatch(setProductQuery(""));
      }

      dispatch(setCurrentCategoryId(null));
    };
  }, [dispatch, isCatalogPath]);
  useEffect(() => {
    if (locationState) {
      dispatch(setProductQuery(locationState.query));
      dispatch(fetchProducts(0));
    }
  }, [dispatch, locationState]);

  const catalogLoading = categoriesLoading && productsLoading;

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <SearchForm show={isCatalogPath} />
      {!catalogLoading && (
        <>
          <Categories />
          <Cards error={error} isCatalog items={items} loading={productsLoading} />
          <LoadBtn items={items} />
        </>
      )}
      <Preloader show={catalogLoading} />
    </section>
  );
}
