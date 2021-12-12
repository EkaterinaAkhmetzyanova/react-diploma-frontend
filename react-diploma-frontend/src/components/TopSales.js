/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopSales } from "../slices/topSalesSlice";
import Preloader from "./Preloader";
import ProductPreview from "./Products/ProductPreview";

export default function TopSales() {
  const { items, status } = useSelector((state) => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopSales());
  }, []);

  if (status === "pending") {
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <Preloader />
    </section>;
  }

  return (
    items.length > 0 && (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {items.map((el) => (
            <div className="col-4" key={el.id}>
              <ProductPreview data={el} />
            </div>
          ))}
        </div>
      </section>
    )
  );
}
