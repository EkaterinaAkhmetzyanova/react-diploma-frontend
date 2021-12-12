/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItem, resetItem } from "../../slices/itemSlice";
import Preloader from "../Preloader";
import { addItem } from "../../slices/cartSlice";

export default function ProductCard({ id }) {
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, status } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItem(id));
    return () => {
      dispatch(resetItem());
    };
  }, []);

  const handleIncreaseAmount = () => {
    setAmount((prev) => (prev < 10 ? prev + 1 : 10));
  };

  const handleDecreaseAmount = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSizeSelection = (size) => {
    return () => {
      setSize(size);
    };
  };

  const handleSubmit = () => {
    const item = {
      id: Number(id),
      title: data.title,
      price: Number(data.price),
      size: size,
      amount: Number(amount),
    };
    dispatch(addItem(item));
    history.push("/cart");
  };

  if (status === "pending") {
    return (
      <section className="catalog-item">
        <Preloader />
      </section>
    );
  }

  return (
    <>
      {data && (
        <section className="catalog-item">
          <h2 className="text-center">{data.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={data.images[0]}
                className="img-fluid"
                style={{ width: "100%" }}
                alt=""
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{data.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{data.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{data.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{data.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{data.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{data.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {data.sizes
                    .filter((size) => size.avalible)
                    .map((el) => (
                      <span
                        className={
                          "catalog-item-size" +
                          (size === el.size ? " selected " : "")
                        }
                        key={el.size}
                        onClick={handleSizeSelection(el.size)}
                      >
                        {el.size}
                      </span>
                    ))}
                </p>
                {data.sizes.filter((size) => size.avalible).length !== 0 && (
                  <p>
                    Количество:{" "}
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        onClick={handleDecreaseAmount}
                        disabled={amount <= 1}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">{amount}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={handleIncreaseAmount}
                        disabled={amount >= 10}
                      >
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>
              {data.sizes.filter((size) => size.avalible).length !== 0 && (
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={handleSubmit}
                  disabled={!size}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
};
