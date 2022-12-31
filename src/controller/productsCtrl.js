const products = require("../models/products");

const productsCtrl = (req, res) => {

  if (req.query.count) {
    const { count } = req.query;
    const productsRamdon = products.productsRandom(count)
    
    return res.status(200).json({
      status: true,
      countElement: productsRamdon.length,
      data: productsRamdon
    });
  };

  const productsRamdon = products.productsRandom()
    
  return res.status(200).json({
    status: true,
    countElement: productsRamdon.length,
    data: productsRamdon
  });
};

module.exports = {
  productsCtrl,
}