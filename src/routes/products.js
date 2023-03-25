const router = require('express').Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

const {
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProductById,
} = require("../controller/productsCtrl");

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProductById);

module.exports = router;