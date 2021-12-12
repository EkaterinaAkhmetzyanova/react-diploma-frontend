import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatalog, makeSearch } from "../../slices/catalogSlice";

export default function CatalogSearch() {
  const { searchField } = useSelector((state) => state.catalog);
  const [search, setSearch] = useState(searchField);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch(searchField);
  }, [searchField]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(makeSearch(search));
    dispatch(getAllCatalog());
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Поиск"
      />
    </form>
  );
}
