import PropTypes from "prop-types";
import { debounce } from "lodash";
import { fetchProducts, setProductQuery } from "../../actions/actionCreators";
import { productsSelector } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";

const debounceFetchProducts = debounce(dispatch => dispatch(fetchProducts(0)), 500);

function SearchForm({ show }) {
  const dispatch = useDispatch();
  const { query } = useSelector(productsSelector);

  const handleChange = (event) => {
    dispatch(setProductQuery(event.target.value));
    debounceFetchProducts(dispatch);
  };

  if (!show) {
    return null;
  }

  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" value={query} onChange={handleChange} />
    </form>
  );
}

SearchForm.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default SearchForm;
