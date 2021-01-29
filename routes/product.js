//package imports
const express = require("express");
const path = require("path");
const multer = require("multer");
//file imports
const productController = require("../controllers/product.js");

//multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads");
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

//routes for '/products'
const router = express.Router();

//GET => all Products
router.get("/", productController.getProducts);

//POST => create a Product
router.post(
    "/add",
    fileUpload.single("image"),
    productController.createProducts
);

//DELETE => '/:id'
router.delete("/:id", productController.deleteProduct);

module.exports = router;
