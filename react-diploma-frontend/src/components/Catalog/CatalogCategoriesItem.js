import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { chooseCategory, getAllCatalog } from "../../slices/catalogSlice";

export default function CatalogCategoriesItem({ data }) {
  const { categoryId } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(chooseCategory(data.id));
    dispatch(getAllCatalog());
  };

  return (
    <li className="nav-item">
      <NavLink
        to="#"
        className="nav-link"
        activeClassName="active"
        isActive={() => categoryId === data.id && true}
        onClick={handleClick}
      >
        {data.title}
      </NavLink>
    </li>
  );
}

CatalogCategoriesItem.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
