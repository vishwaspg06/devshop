function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>{product.description}</p>

      <p className="price">₹ {product.price}</p>

      <p>Stock: {product.stock}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;