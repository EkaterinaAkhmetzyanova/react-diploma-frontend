import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductPreview({ data }) {
  return (
    <div className="card catalog-item-card">
      <div className="card-img-container">
        <img
          src={data.images[0]}
          className="card-img-top img-fluid"
          alt={data.title}
        />
      </div>
      <div className="card-body">
        <p className="card-text">{data.title}</p>
        <p className="card-text">{data.price} руб.</p>
        <Link to={`/catalog/${data.id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
}

ProductPreview.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

ProductPreview.defaultProps = {
  catalog: false,
};
