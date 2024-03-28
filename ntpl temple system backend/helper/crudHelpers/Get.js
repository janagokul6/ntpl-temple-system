const handleGet = async (req, res, Model, find) => {
  let storyData = await Model.find(find);
  // res.send(productData)
  if (storyData) {
    if (storyData.length > 0) {
      res.status(200).json(storyData);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(200).json([]);
  }
};

module.exports = handleGet;
