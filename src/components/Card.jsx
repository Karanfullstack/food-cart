import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
const imageStyle = { width: "200px", borderRadius: "0" };
const backgroundStyle = { backgroundColor: "#5BA199", color: "white" };

function Card(props) {
  const [background, setBackground] = useState();
  const { cart, setCart } = useContext(CartContext);
  const { item } = props;

  //@FunctionToAddCart
  let addCart = function (event, item) {
    let _cart = { ...cart }; //@localObject {}

    //@Creating _cart.items Obj
    if (!_cart.items) {
      _cart.items = {};
    }

    //@Inserting current product Id into items...{}

    if (_cart.items[item._id]) {
      _cart.items[item._id] += 1;
    } else {
      _cart.items[item._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
    setBackground(backgroundStyle);

    setTimeout(() => {
      setBackground(null);
    }, 1000);
  };
  return (
    <>
      <div>
        <Link to={`/products/${item._id}`}>
          <img src={item.image} alt={item.name} style={imageStyle} />
          <h3 className="title-heading">{item.name}</h3>
        </Link>
        <span className="small">{item.size}</span>
        <div className="button">
          <span className="price">{`$${item.price}`}</span>
          <button
            style={background}
            disabled={background}
            onClick={(event) => {
              addCart(event, item);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
