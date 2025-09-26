const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  imageUrl: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
