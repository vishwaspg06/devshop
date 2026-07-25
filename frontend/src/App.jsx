import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1>🛒 DevShop Products</h1>

      {products.map((product) => (
        <div className="card" key={product.id}>
          <h2>{product.name}</h2>
          <p><b>Category:</b> {product.category}</p>
          <p>{product.description}</p>
          <p><b>Price:</b> ₹{product.price}</p>
          <p><b>Stock:</b> {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;