const router = require('express').Router()
const admin = require('../middlewares/admin')

const {
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProductById,
} = require("../controller/productsCtrl");

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", admin, addProduct);
router.put("/:id", admin, updateProduct);
router.delete("/:id", admin, deleteProductById);

module.exports = router;