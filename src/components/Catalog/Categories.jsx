import Message from "../Message";
import Preloader from "../Preloader";
import { categoriesSelector } from "../../selectors";
import { cn } from "../../lib/utils";
import { fetchProducts, setCurrentCategoryId } from "../../actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function Categories() {
  const dispatch = useDispatch();
  const selector = useSelector(categoriesSelector);

  const items = [{ id: null, title: "Все" }, ...selector.items];
  const { current, error, loading } = selector;

  const handleClick = (event, id) => {
    event.preventDefault();

    dispatch(setCurrentCategoryId(id));
    dispatch(fetchProducts(0));
  };

  if (loading) {
    return <Preloader show />;
  }

  if (error) {
    return <Message text={error} type="error" />;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map(item => (
        <li className="nav-item" key={item.id}>
          <a
            className={cn("nav-link", item.id === current && "active")}
            href="#"
            onClick={event => handleClick(event, item.id)}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
