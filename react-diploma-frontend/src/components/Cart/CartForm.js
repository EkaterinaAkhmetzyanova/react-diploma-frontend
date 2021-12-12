/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postItems, resetCart } from "../../slices/cartSlice";
import Preloader from "../Preloader";

export default function CartForm() {
  const { status } = useSelector((state) => state.cart);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    agreement: false,
  });
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    return () => dispatch(resetCart());
  }, []);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postItems({ phone: form.phone, address: form.address })).then(
      setForm({ phone: "", address: "", agreement: false })
    );
  };

  if (status === "success") {
    return <div className="alert-sucess">Ваш заказ оформлен!</div>;
  }

  return (
    <section className="order">
      {items.length > 0 && (
        <>
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  name="phone"
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  name="address"
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  name="agreement"
                  className="form-check-input"
                  id="agreement"
                  checked={form.agreement}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              {status === "pending" ? (
                <Preloader />
              ) : (
                <button type="submit" className="btn btn-outline-secondary">
                  Оформить
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </section>
  );
}
