import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CartItem({ item, number, onDelete }) {
  return (
    <tr>
      <th scope="row">{number + 1}</th>
      <td>
        <Link to={`/catalog/${item.id}`}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.amount}</td>
      <td>{item.price} руб.</td>
      <td>{item.price * item.amount} руб.</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={onDelete(item.id, item.size)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    amount: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  number: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
