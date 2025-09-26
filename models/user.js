const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
