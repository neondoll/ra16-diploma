import Message from "./Message";
import Preloader from "./Preloader";
import { changeOrderFormInput, fetchOrder, selectOrder } from "../slices/order";
import { selectCartItems } from "../slices/cart";
import { useDispatch, useSelector } from "react-redux";

export default function Order() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { error, form, loading, success } = useSelector(selectOrder);

  const btnDisabled = !(form.address && form.agreement && form.phone && items.length);
  const successMessage = success ? "Ваш заказ отправлен" : null;

  const handleChange = (event) => {
    const { id: name, value } = event.currentTarget;

    if (name === "agreement") {
      dispatch(changeOrderFormInput({ name, value: !form.agreement }));

      return;
    }

    dispatch(changeOrderFormInput({ name, value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(fetchOrder({ items, form }));
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              id="agreement"
              type="checkbox"
              value={form.agreement}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button className="btn btn-outline-secondary" disabled={btnDisabled} type="submit">Оформить</button>
        </form>
        <Preloader show={loading} />
        <Message text={error} type="error" />
        <Message text={successMessage} type="success" />
      </div>
    </section>
  );
}
