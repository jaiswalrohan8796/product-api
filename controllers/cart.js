const Product = require("../models/product.js");

const getCart = (req, res, next) => {
    const cart = req.user.cart;
    res.status(200).json(cart);
};

const addItem = async (req, res, next) => {
    const prodId = req.params.id;
    const qty = req.query["quantity"];
    const product = Product.findById(prodId);
    if (!product) {
        return res.status(404).json({ message: "Unable to add to Cart" });
    }
    req.user.addToCart(product, qty);
    res.status(200).json({ message: "done" });
};

const deleteItem = async (req, res, next) => {
    const prodId = req.params.id;
    req.user.deleteFromCart(prodId);
    res.status(200).json({ message: "done" });
}

module.exports = { getCart, addItem , deleteItem};
