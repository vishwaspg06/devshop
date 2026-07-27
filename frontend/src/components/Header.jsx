function Header({ cartCount }) {
  return (
    <header className="header">
      <h1>🛒 DevShop</h1>
      <div className="cart-count">Cart Items: {cartCount}</div>
    </header>
  );
}

export default Header;