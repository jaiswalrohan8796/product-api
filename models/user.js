const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    cart: {
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                qty: {
                    type: Number,
                },
            },
        ],
    },
    totalAmount: {
        type: Number,
    },
});

userSchema.methods.addToCart = function (product, qty) {
    var cart = this.cart;
    if (cart.items.length == 0) {
        cart.items.push({ product_id: product._id, qty: qty });
        this.totalAmount = product.unit_price * qty;
    } else {
    }
    console.log(this.cart);
    return this.save();
};

userSchema.methods.deleteFromCart = function (prodId) {
    var cart = this.cart;
    cart.items.map((id) => {
        if (id == prodId) {
            return null;
        }
        return id;
    });
};

module.exports = mongoose.model("User", userSchema);
