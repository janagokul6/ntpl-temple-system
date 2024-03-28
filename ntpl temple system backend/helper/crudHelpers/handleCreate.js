const path = require("path");

const handleCreate = async (
  req,
  res,
  Model,
  skipArray,
  extra,
  filesPath,
  randomNumber
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
        if (data[key] && data[key].trim() !== "") {
          updatableData[key] = data[key];
        }
      }
    }

    let promimse_all;
    if (files) {
      promimse_all = Promise.all(
        Object.entries(files).map((value, index) => {
          // console.log("files ok");

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

              if (randomNumber && (randomNumber + "").length > 2) {
              } else {
                randomNumber = Math.floor(Math.random() * 10000);
              }

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
                `/${filesPath}${VideoOrImage}/${
                  value[1].md5 +
                  randomNumber +
                  "." +
                  value[1].mimetype.split("/")[1]
                }`;

              // ---------------------- uncomment for debugging
              //   console.log("actual : " + urlPath);
              // ---------------------- uncomment for debugging

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
      // console.log(v);
      // console.log(updatableData);

      updatableData = { ...updatableData, ...extra };
      const date = { Date: new Date() };
      updatableData = { ...updatableData, ...date };
      const isAdded = await Model.create(updatableData);

      if (isAdded) {
        return res.status(200).json({ message: "success", data: isAdded });
      } else {
        return res.status(200).json({ message: "error", data: [] });
      }
    });
  } catch (err) {
    // console.log(err.message);
    return res.status(200).json({ message: "error", data: [] });
  }
};
module.exports = handleCreate;

// http://localhost:8000/clientmedia/64ce29e0de1e67ff53524585/images/cf28179a2f425e3b7d8eab4385e550c77101.jpeg

// http://localhost:8000/clientmedia/64ce29e0de1e67ff53524585/images/cf28179a2f425e3b7d8eab4385e550c74986.jpeg
