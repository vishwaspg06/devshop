import ProductCard from "./ProductCard";

function ProductList({
  products,
  addToCart,
  deleteProduct,
  editProduct,
}) {
  if (products.length === 0) {
    return (
      <h2 className="no-products">
        No products found.
      </h2>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;