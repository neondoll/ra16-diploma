import PropTypes from "prop-types";
import { fetchProducts } from "../../actions/actionCreators";
import { productsSelector } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";

function LoadBtn({ items }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(productsSelector);

  const loadBtnVisible = !loading && (items.length % 6 === 0);

  const handleClick = () => {
    dispatch(fetchProducts(items.length));
  };

  if (!loadBtnVisible) {
    return null;
  }

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" type="button" onClick={handleClick}>Загрузить ещё</button>
    </div>
  );
}

LoadBtn.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LoadBtn;
