const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  photo: { type: String, required: true },
  timestamp: { type: String,  required: true},
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});

productSchema.method('toJSON', function () {
  const { __v, _id ,...products } = this.toObject();
  products.id = _id
  return products
});
module.exports = model("products", productSchema);