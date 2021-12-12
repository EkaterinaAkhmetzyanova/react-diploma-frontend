import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../slices/cartSlice";
import CartItem from "./CartItem";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (id, size) => {
    return () => {
      dispatch(removeItem({ id, size }));
    };
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((el, number) => {
            return (
              <CartItem
                item={el}
                number={number}
                onDelete={handleDelete}
                key={el.id + el.size}
              />
            );
          })}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>
              {items.reduce((sum, item) => sum + item.price * item.amount, 0)}{" "}
              руб.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
