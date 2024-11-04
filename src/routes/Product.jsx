import Paths from "../paths";
import ProductView from "../components/ProductView";
import { cartSelector, productSelector } from "../selectors";
import { fetchProduct, setCartItems } from "../actions/actionCreators";
import { redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Product() {
  const dispatch = useDispatch();
  const { error, item, loading } = useSelector(productSelector);
  const { id } = useParams();
  const { items: cartItems } = useSelector(cartSelector);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const isProduct = Boolean(Object.keys(item).length);
  const availableSizes = isProduct ? item.sizes.filter(size => size.available) : null;

  const addCartItem = () => {
    const foundCartItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === selectedSize);

    let newCartItem;
    let newCartItems = [...cartItems.map(cartItem => ({ ...cartItem }))];

    if (foundCartItem) {
      newCartItem = {
        ...foundCartItem,
        count: foundCartItem.count + selectedQuantity,
        price: item.price,
        total: foundCartItem.total + item.price * selectedQuantity,
      };

      newCartItems = cartItems.filter(cartItem => !(cartItem.id === item.id && cartItem.size === selectedSize));
    }
    else {
      newCartItem = {
        id: item.id,
        title: item.title,
        size: selectedSize,
        price: item.price,
        total: item.price * selectedQuantity,
        count: selectedQuantity,
      };
    }

    newCartItems = [...newCartItems, newCartItem];

    dispatch(setCartItems(newCartItems));

    redirect(Paths.CART);
  };
  const decrementQuantity = () => {
    setSelectedQuantity(prev => prev - 1);
  };
  const incrementQuantity = () => {
    setSelectedQuantity(prev => prev + 1);
  };

  return (
    <ProductView
      addCartItem={addCartItem}
      availableSizes={availableSizes}
      decrementQuantity={decrementQuantity}
      error={error}
      incrementQuantity={incrementQuantity}
      isProduct={isProduct}
      item={item}
      loading={loading}
      selectedSize={selectedSize}
      selectedQuantity={selectedQuantity}
      setSelectedSize={setSelectedSize}
    />
  );
}
