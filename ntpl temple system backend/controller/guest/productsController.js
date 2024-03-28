const productModel = require("../../model/product.model");

const get = async (req, res) => {
  let data = await productModel.find();
  return res.status(200).json({ message: "success", data: data });
};

module.exports = { get };
