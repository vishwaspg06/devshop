import { useState } from "react";

function ProductForm({ addProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    const success = await addProduct(productData);

    if (success) {
      setMessage("Product added successfully.");

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: ""
      });
    } else {
      setMessage("Failed to add product.");
    }
  };

  return (
    <section className="product-form-section">
      <h2>Add New Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Product description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock quantity"
          min="0"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL or filename (optional)"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit" className="save-product-btn">
          Save Product
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </section>
  );
}

export default ProductForm;