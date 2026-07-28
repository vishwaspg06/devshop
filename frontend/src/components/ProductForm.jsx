import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  image: "",
};

function ProductForm({
  addProduct,
  updateProduct,
  editingProduct,
  cancelEdit,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        image: editingProduct.image || "",
      });

      setMessage("");
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      formData.price === "" ||
      formData.stock === ""
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    let success = false;

    if (editingProduct) {
      success = await updateProduct(
        editingProduct.id,
        productData
      );
    } else {
      success = await addProduct(productData);
    }

    if (success) {
      setMessage(
        editingProduct
          ? "Product updated successfully."
          : "Product added successfully."
      );

      setFormData(emptyForm);
    } else {
      setMessage(
        editingProduct
          ? "Failed to update product."
          : "Failed to add product."
      );
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setMessage("");
    cancelEdit();
  };

  return (
    <section className="product-form-section">
      <h2>
        {editingProduct
          ? "Edit Product"
          : "Add New Product"}
      </h2>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >
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

        <button
          type="submit"
          className="save-product-btn"
        >
          {editingProduct
            ? "Update Product"
            : "Save Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={handleCancel}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}
    </section>
  );
}

export default ProductForm;