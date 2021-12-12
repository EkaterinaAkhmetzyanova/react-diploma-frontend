/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCatalogCategories } from "../../slices/catalogSlice";
import CatalogCategoriesItem from "./CatalogCategoriesItem";

export default function CatalogCategories() {
  const { categories, status } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogCategories());
  }, []);

  useEffect(() => {
    if (status.categories === "error") {
      setTimeout(() => dispatch(getCatalogCategories()), 1000);
    }
  }, [status.categories]);

  const allCategories = [{ id: 0, title: "Все" }, ...categories];

  return (
    <ul className="catalog-categories nav justify-content-center">
      {allCategories.map((category) => (
        <CatalogCategoriesItem data={category} key={category.id} />
      ))}
    </ul>
  );
}
