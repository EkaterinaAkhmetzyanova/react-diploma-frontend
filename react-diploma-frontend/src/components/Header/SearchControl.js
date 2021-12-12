import { useDispatch } from "react-redux";
import { setOpening } from "../../slices/searchFormSlice";

export default function SearchControl() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setOpening());
  };

  return (
    <div
      data-id="search-expander"
      className="header-controls-pic header-controls-search"
      onClick={handleClick}
    />
  );
}
