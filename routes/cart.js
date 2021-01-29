const express = require("express");
const path = require("path");
const cartController = require("../controllers/cart.js");

const router = express.Router();

router.get("/", cartController.getCart);

router.post("/add/:id", cartController.addItem);

router.delete("/delete/:id", cartController.deleteItem)

module.exports = router;
