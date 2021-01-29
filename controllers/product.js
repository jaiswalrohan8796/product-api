//package imports
const path = require("path");

//file imports
const Product = require("../models/product.js");
const deleteHandler = require("../utils/deleteHandler.js");
//GET => List of Products
const getProducts = (req, res, next) => {
    Product.find({})
        .then((prods) => {
            res.status(200).json(prods);
        })
        .catch((err) => {
            res.status(404).json({ message: "Unable to fetch products !" });
            console.log(err);
        });
};
//POST => create a Product
const createProducts = (req, res, next) => {
    const { name, desc, quantity, unit_price } = req.body;
    const image = req.file.path;
    const newProduct = new Product({
        name: name,
        desc: desc,
        quantity: quantity,
        unit_price: unit_price,
        image: image,
    });
    newProduct
        .save()
        .then((result) => {
            res.status(200).json({
                message: `Product name ${result.name} added`,
            });
        })
        .catch((err) => {
            res.status(404).json({ "Unable to add product !": err });
            console.log(err);
        });
};

//DELETE => Delete a product
const deleteProduct = async (req, res, next) => {
    const _id = req.params.id;
    const result = await Product.findByIdAndDelete(_id);
    deleteHandler(path.join(process.cwd(), result.image));
    if (!result) {
        return res.status(404).json({ Error: "Product not found" });
    }
    res.status(200).json({ message: `Product ${result.name} deleted` });
};

module.exports = { getProducts, createProducts, deleteProduct };
