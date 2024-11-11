import Cards from "./Cards";
import { fetchTopSales, selectTopSales } from "../slices/topSales";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function TopSales() {
  const dispatch = useDispatch();
  const { error, items, loading } = useSelector(selectTopSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <Cards error={error} items={items} loading={loading} />
    </section>
  );
}
