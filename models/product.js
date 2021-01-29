const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    unit_price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Product", productSchema);
