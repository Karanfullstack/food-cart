import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const apiUrl = "https://star-spark-pasta.glitch.me/api/products";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${apiUrl}`);
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="product-container">
      <h3>
        Products List /
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </h3>
      <div className="product-wrapper">
        {products.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Products;
