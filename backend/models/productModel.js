const db = require("../config/db");

// Get all products
const getAllProducts = (callback) => {
    db.query("SELECT * FROM products", callback);
};

// Get product by ID
const getProductById = (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

// Create product
const createProduct = (product, callback) => {
    db.query("INSERT INTO products SET ?", product, callback);
};

// Update product
const updateProduct = (id, product, callback) => {
    db.query("UPDATE products SET ? WHERE id = ?", [product, id], callback);
};

// Delete product
const deleteProduct = (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};