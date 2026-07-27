import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import "./App.css";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (requestError) {
      console.error("Error fetching products:", requestError);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      await axios.post(API_URL, productData);
      await fetchProducts();
      return true;
    } catch (requestError) {
      console.error("Error adding product:", requestError);
      return false;
    }
  };

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (index) => {
    setCart((currentCart) =>
      currentCart.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Header cartCount={cart.length} />

      <ProductForm addProduct={addProduct} />

      <SearchBar search={search} setSearch={setSearch} />

      {loading && <p className="status-message">Loading products...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
        />
      )}

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;