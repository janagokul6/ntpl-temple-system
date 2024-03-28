const handleDelete = async (req, res, Model, find) => {
  let is_deleated = await Model.deleteOne(find);

  if (is_deleated) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(500).json({ message: "err" });
  }
};

module.exports = handleDelete;
