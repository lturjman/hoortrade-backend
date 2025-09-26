var express = require("express");
var router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

const Product = require("../models/product");

router.get("/", (req, res) => {
  return Product.find({ user: req.user.userId }).then((data) => {
    res.json({ data });
  });
});

router.get("/:id", (req, res) => {
  return Product.findOne({ user: req.user.userId, _id: req.params.id }).then(
    (data) => {
      res.json({ data });
    }
  );
});

router.post("/", (req, res) => {
  const productData = { ...req.body.product, user: req.user.userId };
  return Product.create(productData).then((data) => {
    res.json({ data });
  });
});

router.put("/:id", (req, res) => {
  return Product.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body.product,
    { new: true }
  ).then((data) => {
    res.json({ data });
  });
});

router.delete("/:id", (req, res) => {
  return Product.findByIdAndDelete({
    _id: req.params.id,
    user: req.user.userId,
  }).then((data) => {
    res.json({ data });
  });
});

module.exports = router;
