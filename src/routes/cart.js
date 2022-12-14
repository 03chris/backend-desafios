const router = require('express').Router()

const {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart
} = require("../controller/cartCtrl");

router.post("/", addCart);
router.delete("/:id", deleteCart);
router.get("/:id/products", getProducts);
router.post("/:id/products", addProductToCart);

module.exports = router;