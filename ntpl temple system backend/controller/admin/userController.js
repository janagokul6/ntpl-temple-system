const userModel = require("../../model/user.model");
const path = require("path");
const bcrypt = require("bcrypt");
// ----------------------------------------------------------------
// crud handlers
const handleCreate = require("../../helper/crudHelpers/handleCreate");
const handleDelete = require("../../helper/crudHelpers/Delete");
const handleUpdate = require("../../helper/crudHelpers/Update");
// ----------------------------------------------------------------
const add = async (req, res) => {
  let role = req.body.role;
  let processedRole = [];

  if (role || !(role === "undefined")) {
    processedRole = JSON.parse(role);
  }

  try {
    handleCreate(
      req,
      res,
      userModel,
      ["role", "password"],
      {
        role: processedRole,
        password: await bcrypt.hash(
          req.body.password,
          Number.parseInt(process.env.SALT_ROUND)
        ),
      },
      ""
    );
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

const get = async (req, res) => {
  let data = await userModel.find();
  return res.status(200).json({ message: "success", data: data });
};
const deleteData = async (req, res) => {
  handleDelete(req, res, userModel, { _id: req.params.itemId });
};
const updateDate = async (req, res) => {
  let role = req.body.role;
  let processedRole = [];

  if (role || !(role === "undefined")) {
    processedRole = JSON.parse(role);
  }

  let updateObj = {};

  if (req.body.password && req.body.password.length > 0) {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number.parseInt(process.env.SALT_ROUND)
    );
    updateObj = {
      role: processedRole,
      password: hashedPassword,
    };
  } else {
    updateObj = {
      role: processedRole,
    };
  }

  handleUpdate(req, res, userModel, ["role", "password"], updateObj, "", {
    _id: req.params.itemId,
  });
};

module.exports = { add, get, deleteData, updateDate };
