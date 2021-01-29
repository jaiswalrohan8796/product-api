//package imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

//file imports
const mongodbURI = require("./config.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const User = require("./models/user.js");

//configs
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

//test user
app.use((req, res, next) => {
    User.findById("6013bf30e5692327b05571d1")
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

//routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
//DB connection and server listening
mongoose
    .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    })
    .catch((err) => console.log(err));
