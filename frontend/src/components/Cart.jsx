function Cart({ cart, removeFromCart }) {
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="cart">
      <h2>🛍 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${index}`}>
              <div>
                <strong>{item.name}</strong>
                <br />
                ₹ {item.price}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h3>Total Items: {cart.length}</h3>
          <h2>Total Price: ₹ {totalPrice}</h2>

          <button className="checkout-btn">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;