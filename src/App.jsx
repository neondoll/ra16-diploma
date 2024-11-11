import Layout from "./Layout";
import Paths from "./paths";
import { About, Cart, Catalog, Contacts, NotFound, Product, Root } from "./routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { restoreCart } from "./slices/cart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreCart());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter basename="/ra16-diploma/">
        <Layout>
          <Routes>
            <Route path={Paths.ABOUT} element={<About />} />
            <Route path={Paths.CART} element={<Cart />} />
            <Route path={Paths.CATALOG} element={<Catalog />} />
            <Route path={Paths.CONTACTS} element={<Contacts />} />
            <Route path={Paths.NOT_FOUND} element={<NotFound />} />
            <Route path={Paths.PRODUCT(":id")} element={<Product />} />
            <Route path={Paths.ROOT} element={<Root />} />
            <Route path="*" render={() => <Navigate to={Paths.NOT_FOUND} replace={true} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
