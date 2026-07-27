function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search products..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default SearchBar;