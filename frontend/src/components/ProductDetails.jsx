import { Link, useParams } from "react-router-dom";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found</h2>

        <Link to="/" className="back-link">
          Back to Products
        </Link>
      </div>
    );
  }

  const imagePath = product.image
    ? `/images/${product.image}`
    : "/images/default-product.jpg";

  return (
    <div className="product-details">
      <img
        src={imagePath}
        alt={product.name}
        className="details-image"
      />

      <h1>{product.name}</h1>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>{product.description}</p>

      <p className="price">₹ {product.price}</p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

      <Link to="/" className="back-link">
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetails;