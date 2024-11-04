import Message from "./Message";
import Paths from "../paths";
import Preloader from "./Preloader";
import PropTypes from "prop-types";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

function Cards({ error, isCatalog, items, loading }) {
  return (
    <>
      <div className="row">
        {items.map(item => (
          <div className="col-4" key={item.id}>
            <div className={cn("card", isCatalog && "catalog-item-card")}>
              <img alt={item.title} className="card-img-top img-fluid" src={item.images[0]} />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">
                  {item.price}
                  {" "}
                  руб.
                </p>
                <Link className="btn btn-outline-primary" to={Paths.PRODUCT(item.id)}>Заказать</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Message text={error} type="error" />
      <Preloader show={loading} />
    </>
  );
}

Cards.propTypes = {
  error: PropTypes.oneOf([PropTypes.string, null]),
  isCatalog: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  loading: PropTypes.bool,
};

export default Cards;
