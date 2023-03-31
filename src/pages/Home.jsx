import React from "react";
import Products from "../components/Products";
import headerImg from "../images/pizza.png";
function Home() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="left-side">
            <h6>
              <em>Are you hungry</em>
            </h6>
            <h1>Don't wait !</h1>
            <button>Order Now</button>
          </div>
          <div className="right-side">
            <img src={headerImg} alt="header" />
          </div>
        </div>
      </div>
      <div>
        <Products />
      </div>
    </>
  );
}

export default Home;
