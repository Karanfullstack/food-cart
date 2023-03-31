import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import emptyCart from "../images/empty-cart.png";
const apiUrl = "https://star-spark-pasta.glitch.me/api/products/cart-items";
function Cart() {
  let total = 0;
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [fetchedPrice, setToogleFetchedPrice] = useState(false);
  useEffect(() => {
    if (!cart.items) {
      return;
    }
          
    if (fetchedPrice) {
      return;
    }

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((product) => {
        setProducts(product);
        setToogleFetchedPrice(true);
      });
  }, [cart, fetchedPrice]);

  const getQty = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    const existingQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productId) => {
    const existingQty = cart.items[productId];

    if (existingQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;

    setCart(_cart);
  };

  const getPrice = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  };

  const delteElement = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    const freshedDataUpdated = products.filter(
      (product) => product._id !== productId
    );
    setCart(_cart);
    setProducts(freshedDataUpdated);
  };

  const handelOrder = () => {
    window.alert("Your order is sucessfully placed");
    setProducts([]);
    setCart({});
  };

  return products.length ? (
    <div className="cart-container">
      <h3>cart page</h3>
      <ul>
        {products.map((item, index) => {
          return (
            <li key={index}>
              <div className="wrapper">
                <div className="image-and-title">
                  <img src={item.image} alt="" style={{ height: "70px" }} />
                  <span>{item.name}</span>
                </div>
                <div className="button">
                  <button
                    onClick={() => {
                      decrement(item._id);
                    }}
                  >
                    -
                  </button>
                  <b>{getQty(item._id)}</b>
                  <button
                    onClick={() => {
                      increment(item._id);
                    }}
                  >
                    +
                  </button>
                </div>
                <span>${getPrice(item._id, item.price)}</span>
                <button
                  onClick={() => {
                    delteElement(item._id);
                  }}
                  className="delete"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <hr style={{ marginTop: 19 }} />
      <div className="grand-class">
        <div className="grand-total">
          <strong>Grand Total:</strong> ${total}
        </div>
        <div className="order-now">
          <button onClick={handelOrder}>Order Now</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="empty-cart">
      <img src={emptyCart} alt="cart" />
    </div>
  );
}

export default Cart;
