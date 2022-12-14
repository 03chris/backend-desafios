const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  timestamp: { type: String,  required: true},
  products: [{ type: Array, required: true }]
});

cartSchema.method('toJSON', function () {
  const { __v, _id ,...cart } = this.toObject();
  cart.id = _id
  return cart
});

module.exports = model("cart", cartSchema);