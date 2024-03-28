const categoryModel = require("../../model/category.model");

const get = async (req, res) => {
  let data = await categoryModel.find();
  return res.status(200).json({ message: "success", data: data });
};

module.exports = { get };
