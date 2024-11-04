import Paths from "../paths";
import { cartSelector } from "../selectors";
import { Link } from "react-router-dom";
import { setCartItems } from "../actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);

  const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

  const handleDelete = (event, item) => () => {
    event.preventDefault();

    const { id, size } = item;

    const newItems = items.filter(item => !(item.id === id && item.size === size));

    dispatch(setCartItems(newItems));
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
          {items.map((item, index) => (
            <tr key={`${item.id}-${item.size}`}>
              <td scope="row">{index + 1}</td>
              <td><Link to={Paths.PRODUCT(item.id)}>{item.title}</Link></td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>
                {item.price}
                {" "}
                руб.
              </td>
              <td>
                {item.total}
                {" "}
                руб.
              </td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  type="button"
                  onClick={event => handleDelete(event, item)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>
              {totalAmount}
              {" "}
              руб.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
