function ProductCard({
  product,
  addToCart,
  deleteProduct,
  editProduct,
}) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  };

  const imagePath = product.image
    ? `/images/${product.image}`
    : "/images/default-product.jpg";

  return (
    <div className="card">
      <img
        src={imagePath}
        alt={product.name}
        className="product-image"
        onError={(event) => {
          event.currentTarget.src =
            "/images/default-product.jpg";
        }}
      />

      <h2>{product.name}</h2>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>{product.description}</p>

      <p className="price">₹ {product.price}</p>

      <p>Stock: {product.stock}</p>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

      <button
        className="edit-btn"
        onClick={() => editProduct(product)}
      >
        Edit Product
      </button>

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete Product
      </button>
    </div>
  );
}

export default ProductCard;