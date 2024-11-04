import headerLogo from "../../assets/header-logo.png";
import Nav from "./Nav";
import Paths from "../../paths";
import { cartSelector } from "../../selectors";
import { cn } from "../../lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { searchProducts } from "../../actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemsCount: cartItemsCount } = useSelector(cartSelector);
  const [searchFormInputValue, setSearchFormInputValue] = useState("");
  const [searchFormInvisible, setSearchFormInvisible] = useState(true);

  const handleCartClick = () => {
    navigate(Paths.CART);
  };
  const handleSearchExpanderClick = () => {
    if (!searchFormInputValue) {
      setSearchFormInvisible(prev => !prev);

      return;
    }

    const query = searchFormInputValue;

    dispatch(searchProducts(query));

    setSearchFormInputValue("");
    setSearchFormInvisible(true);

    navigate(Paths.CATALOG, { state: { query } });
  };
  const handleSearchFormInputChange = (event) => {
    setSearchFormInputValue(event.target.value);
  };
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to={Paths.ROOT}>
              <img src={headerLogo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <Nav />
              <div>
                <div className="header-controls-pics">
                  <div
                    className="header-controls-pic header-controls-search"
                    data-id="search-expander"
                    onClick={handleSearchExpanderClick}
                  />
                  {/* Do programmatic navigation on click to /cart */}
                  <div className="header-controls-pic header-controls-cart" onClick={handleCartClick}>
                    {cartItemsCount
                      ? (
                          <div className="header-controls-cart-full">{cartItemsCount}</div>
                        )
                      : null}
                    <div className="header-controls-cart-menu" />
                  </div>
                </div>
                <form
                  className={cn("header-controls-search-form form-inline", searchFormInvisible && "invisible")}
                  data-id="search-form"
                  onSubmit={handleSearchFormSubmit}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={searchFormInputValue}
                    onChange={handleSearchFormInputChange}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
