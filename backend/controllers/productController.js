const Product = require("../models/productModel");

// GET all products
exports.getProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// GET product by ID
exports.getProduct = (req, res) => {
  Product.getProductById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results[0]);
  });
};

// CREATE product
exports.createProduct = (req, res) => {
  Product.createProduct(req.body, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Product created successfully",
      id: results.insertId
    });
  });
};

// UPDATE product
exports.updateProduct = (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Product updated successfully"
    });
  });
};

// DELETE product
exports.deleteProduct = (req, res) => {
  Product.deleteProduct(req.params.id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Product deleted successfully"
    });
  });
};