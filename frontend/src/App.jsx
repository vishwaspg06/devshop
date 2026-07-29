import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import CategoryFilter from "./components/CategoryFilter";
import ProductDetails from "./components/ProductDetails";

import "./App.css";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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
      setMessage("");

      await axios.post(API_URL, productData);
      await fetchProducts();

      setMessage("Product added successfully.");
      return true;
    } catch (requestError) {
      console.error("Error adding product:", requestError);
      setMessage("Failed to add product.");
      return false;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      setMessage("");

      await axios.put(`${API_URL}/${productId}`, productData);
      await fetchProducts();

      setEditingProduct(null);
      setMessage("Product updated successfully.");
      return true;
    } catch (requestError) {
      console.error("Error updating product:", requestError);
      setMessage("Failed to update product.");
      return false;
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setMessage("");
  };

  const deleteProduct = async (productId) => {
    try {
      setMessage("");

      await axios.delete(`${API_URL}/${productId}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );

      setCart((currentCart) =>
        currentCart.filter(
          (item) => item.id !== productId
        )
      );

      if (editingProduct?.id === productId) {
        setEditingProduct(null);
      }

      setMessage("Product deleted successfully.");
    } catch (requestError) {
      console.error("Error deleting product:", requestError);
      setMessage("Failed to delete product.");
    }
  };

  const addToCart = (product) => {
    setCart((currentCart) => [
      ...currentCart,
      product,
    ]);
  };

  const removeFromCart = (index) => {
    setCart((currentCart) =>
      currentCart.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const homePage = (
    <>
      <ProductForm
        addProduct={addProduct}
        updateProduct={updateProduct}
        editingProduct={editingProduct}
        cancelEdit={cancelEdit}
      />

      {message && (
        <p className="operation-message">
          {message}
        </p>
      )}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && (
        <p className="status-message">
          Loading products...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      )}

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </>
  );

  return (
    <div className="container">
      <Header cartCount={cart.length} />

      <Routes>
        <Route path="/" element={homePage} />

        <Route
          path="/product/:id"
          element={
            loading ? (
              <p className="status-message">
                Loading product...
              </p>
            ) : (
              <ProductDetails
                products={products}
                addToCart={addToCart}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;