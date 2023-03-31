import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./components/CartContext";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState({});
  // @localStorage
  useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    setCart(JSON.parse(cart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <CartContext.Provider value={{ cart, setCart }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:_id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
