import Cards from "../Cards";
import Categories from "./Categories";
import LoadBtn from "./LoadBtn";
import Paths from "../../paths";
import Preloader from "../Preloader";
import SearchForm from "./SearchForm";
import { categoriesSelector, productsSelector } from "../../selectors";
import { fetchCategories, fetchProducts, setCurrentCategoryId, setProductQuery } from "../../actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Catalog() {
  const dispatch = useDispatch();
  const { pathname: locationPathname, state: locationState } = useLocation();
  const { error, items, loading: productsLoading } = useSelector(productsSelector);
  const { loading: categoriesLoading } = useSelector(categoriesSelector);

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
