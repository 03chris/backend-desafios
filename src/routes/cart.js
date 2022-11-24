const router = require('express').Router()

const {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProduct,
} = require("../controller/cartCtrl");

router.post("/", addCart);
router.delete("/:id", deleteCart);
router.get("/:id/products", getProducts);
router.post("/:id/products", addProductToCart);
router.delete("/:id/products/:id_prod", deleteProduct);

module.exports = router;