const path = require("path");

const handleUpdate = async (
  req,
  res,
  Model,
  skipArray,
  extra,
  filesPath,
  UpdateObject
) => {
  const data = req.body;
  const files = req.files;

  if (Object.keys(data).length < 1 && !files) return false;
  try {
    let updatableData = {};
    for (const key in data) {
      let isUpdatable = true;
      for (let i = 0; i < skipArray.length; i++) {
        if (skipArray[i] === key) {
          isUpdatable = false;
        }
      }
      if (isUpdatable) {
        if (
          data[key] &&
          data[key].trim() !== null &&
          data[key].trim() !== "" &&
          data[key].trim() !== "undefined"
        ) {
          updatableData[key] = data[key];
          // console.log(data);
          // console.log(data[key]);
        }
      }
    }

    // console.log(updatableData);
    let promimse_all;
    if (files) {
      promimse_all = Promise.all(
        Object.entries(files).map((value, index) => {
          // console.log("----> the value is " + value);

          return new Promise((resolve, reject) => {
            let FilesArray = Object.keys(files);
            if (FilesArray.length > 0) {
              // console.log("files okdddddd");

              let VideoOrImage = "";
              if (value[1].mimetype.includes("video")) {
                VideoOrImage = "videos";
              } else if (value[1].mimetype.includes("image")) {
                VideoOrImage = "images";
              } else {
                resolve("error");
                return res
                  .status(200)
                  .json({ message: `${value[0]}_fileTypeError` });
              }

              const randomNumber = Math.floor(Math.random() * 10000);
              let movePath = path.join(
                __dirname,
                `../../assets/${filesPath}${VideoOrImage}/${
                  value[1].md5 +
                  randomNumber +
                  "." +
                  value[1].mimetype.split("/")[1]
                }`
              );
              let urlPath =
                process.env.LIVEURL +
                `/${filesPath}/${VideoOrImage}/${
                  value[1].md5 +
                  randomNumber +
                  "." +
                  value[1].mimetype.split("/")[1]
                }`;

              //   console.log(urlPath);

              value[1].mv(movePath, async (err) => {
                if (err) {
                  //   return res.status(500).json({ message: `${key}_storeError` });
                  // console.log("bad");
                  // console.log(err);
                  resolve("notOk");
                } else {
                  updatableData[value[0]] = urlPath;
                  //   console.log(updatableData);
                  resolve("ok");
                }
              });
            }
          });
        })
      );
    } else {
      promimse_all = Promise.resolve("ok");
    }

    promimse_all.then(async (v) => {
      updatableData = { ...updatableData, ...extra };

      // console.log("=========================");
      // console.log("the Updatable data is: ");
      // console.log(updatableData);
      // console.log("=========================");
      const isUpdated = await Model.findOneAndUpdate(
        UpdateObject,
        updatableData
      );

      // console.log(isUpdated);
      if (isUpdated) {
        const getNewData = await Model.find(UpdateObject);
        // console.log(getNewData);
        return res.status(200).json({ message: "success", data: getNewData });
      } else {
        return res.status(200).json({ message: "error", data: [] });
      }
    });
  } catch (err) {
    // console.log(err.message);
    return res.status(200).json({ message: "error", data: [] });
  }
};

module.exports = handleUpdate;
