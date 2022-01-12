/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-operators */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetSearchForm } from "../../slices/searchFormSlice";
import { makeSearch } from "../../slices/catalogSlice";
import { getAllCatalog, resetCatalog } from "../../slices/catalogSlice";
import Preloader from "../Preloader";
import ProductPreview from "../Products/ProductPreview";

export default function Catalog() {
  const { items, loadMore, status } = useSelector((state) => state.catalog);
  const { searchFormField } = useSelector((state) => state.searchForm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchFormField !== "") {
      dispatch(makeSearch(searchFormField));
      dispatch(resetSearchForm);
    }
    dispatch(getAllCatalog());
    return () => dispatch(resetCatalog());
  }, []);

  const handleOffset = () => {
    dispatch(getAllCatalog(true));
  };

  if (status.catalog === "pending") {
    return <Preloader />;
  }

  return (
    <>
      <div className="row">
        {items.length > 0 &&
          items.map((item) => (
            <div className="col-4" key={item.id}>
              <ProductPreview data={item} />
            </div>
          ))}
        {status.catalog !== "pending" && !items.length && (
          <div className="card w-100 text-center">
            <div className="card-body">В этой категории нет товаров.</div>
          </div>
        )}
      </div>
      {loadMore && ((status.offset === "error" && (
          <div handleError={() => dispatch(getAllCatalog(true))} />
        )) ||
      (status.offset === "pending" && <Preloader />) || (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleOffset}>
            Загрузить ещё
          </button>
        </div>
      ))}
    </>
  );
}
