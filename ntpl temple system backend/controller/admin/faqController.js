const FAQsModel = require("../../model/faqs.model")

// ----------------------------------------------------------------
// crud handlers
const handleCreate = require("../../helper/crudHelpers/handleCreate");
const handleDelete = require("../../helper/crudHelpers/Delete");
const handleUpdate = require("../../helper/crudHelpers/Update");
// ----------------------------------------------------------------

const add = async (req, res) => {
  try {
    handleCreate(req, res, FAQsModel, [], {}, "");
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

const get = async (req, res) => {
  let data = await FAQsModel.find();
  return res.status(200).json({ message: "success", data: data });
};
const deleteData = async (req, res) => {
  handleDelete(req, res, FAQsModel, { _id: req.params.itemId });
};
const updateDate = async (req, res) => {
  handleUpdate(req, res, FAQsModel, [], {}, "", { _id: req.params.itemId });
};

module.exports = { add, get, deleteData, updateDate };
