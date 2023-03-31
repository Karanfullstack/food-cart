import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import cartImage from "../images/cart.png";
import { CartContext } from "./CartContext";
function Navigation() {
  const { cart } = useContext(CartContext);
  return (
    <nav className="main">
      <Link to="/">
        <img src={logo} alt="cart" />
      </Link>

      <ul className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">
            <div>
              <span>{cart.totalItems? cart.totalItems : 0}</span>
              <img src={cartImage} alt="cart" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
