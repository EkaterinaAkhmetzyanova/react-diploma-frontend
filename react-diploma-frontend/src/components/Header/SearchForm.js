import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  resetSearchForm,
  setOpening,
  setSearchQuery,
} from "../../slices/searchFormSlice";
import { getAllCatalog, makeSearch } from "../../slices/catalogSlice";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen } = useSelector((state) => state.searchForm);
  const searchText = useRef(null);

  useEffect(() => {
    if (isOpen) {
      searchText.current.focus();
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search === "") {
      dispatch(setOpening());
    } else {
      if (history.location.pathname === "/catalog") {
        dispatch(makeSearch(search));
        dispatch(getAllCatalog());
        dispatch(resetSearchForm());
      } else {
        dispatch(setSearchQuery(search));
        history.push("/catalog");
        setSearch("");
      }
    }
  };

  return (
    <form
      data-id="search-form"
      className={
        "header-controls-search-form form-inline" + (isOpen ? "" : " invisible")
      }
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        value={search}
        ref={searchText}
        onChange={handleChange}
      />
    </form>
  );
}
