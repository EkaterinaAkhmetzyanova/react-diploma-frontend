import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CartControl() {
  const { items } = useSelector((state) => state.cart);
  const history = useHistory();

  const handleClick = () => {
    history.push("/cart");
  };

  return (
    <div
      className="header-controls-pic header-controls-cart"
      onClick={handleClick}
    >
      {items.length > 0 && (
        <div className="header-controls-cart-full">{items.length}</div>
      )}
      <div className="header-controls-cart-menu"></div>
    </div>
  );
}
