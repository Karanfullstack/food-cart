import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const apiUrl = "https://star-spark-pasta.glitch.me/api/products";

function SingleProduct() {
  const { cart, setCart } = useContext(CartContext);

  const [singleItem, setSingleItem] = useState({});

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${apiUrl}/${params._id}`)
      .then((res) => res.json())
      .then((item) => {
        setSingleItem(item);
      });
  }, [params._id]);

  const addCart = (event, item) => {
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }

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
    console.log(_cart);
  };

  return (
    <div className="single-product">
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <div className="product-details">
        <img src={singleItem.image} alt="logo" />
        <div className="details">
          <h2>{singleItem.name}</h2>
          <h3>{singleItem.size}</h3>
          <p>${singleItem.price}</p>
          <button
            onClick={(event) => {
              addCart(event, singleItem);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
