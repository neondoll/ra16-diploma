import ProductTable from "./ProductTable";
import PropTypes from "prop-types";
import { cn } from "../lib/utils";
import Preloader from "./Preloader.jsx";
import Message from "./Message.jsx";
import { Fragment } from "react";

function ProductView({
  addCartItem,
  availableSizes,
  decrementQuantity,
  error,
  incrementQuantity,
  isProduct,
  item,
  loading,
  selectedQuantity,
  selectedSize,
  setSelectedSize,
}) {
  if (loading) {
    return <Preloader show />;
  }

  if (error) {
    return <Message text={error} type="error" />;
  }

  if (!isProduct) {
    return null;
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img alt={item.title} className="img-fluid" src={item.images[0]} />
        </div>
        <div className="col-7">
          <ProductTable item={item} />
          {availableSizes.length
            ? (
                <>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {availableSizes.map(size => (
                        <Fragment key={size.size}>
                      &nbsp;
                          <span
                            className={cn("catalog-item-size", size.size === selectedSize && "selected")}
                            role="radio"
                            tabIndex={0}
                            aria-checked={false}
                            onClick={() => setSelectedSize(size.size)}
                          >
                            {size.size}
                          </span>
                        </Fragment>
                      ))}
                    </p>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          disabled={selectedQuantity < 2}
                          type="button"
                          onClick={decrementQuantity}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">{selectedQuantity}</span>
                        <button
                          className="btn btn-secondary"
                          disabled={selectedQuantity > 9}
                          type="button"
                          onClick={incrementQuantity}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  <button className="btn btn-danger btn-block btn-lg" disabled={!selectedSize} onClick={addCartItem}>
                    В корзину
                  </button>
                </>
              )
            : <p>Нет в наличии</p>}
        </div>
      </div>
    </section>
  );
}

ProductView.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  availableSizes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  decrementQuantity: PropTypes.func.isRequired,
  error: PropTypes.string,
  incrementQuantity: PropTypes.func.isRequired,
  isProduct: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    sku: PropTypes.string,
    manufacturer: PropTypes.string,
    color: PropTypes.string,
    material: PropTypes.string,
    season: PropTypes.string,
    reason: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  selectedQuantity: PropTypes.number.isRequired,
  selectedSize: PropTypes.string.isRequired,
  setSelectedSize: PropTypes.func.isRequired,
};

export default ProductView;
