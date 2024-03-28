const customerModel = require("../../model/customer.model");

const getAllWishlist = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);
  return res
    .status(200)
    .json({ message: "success", data: customerData.wishlists });
};

const addToWishlist = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);

  const wishlistArray = customerData.wishlists;

  if (wishlistArray.includes(req.body.product_id)) {
    return res
      .status(200)
      .json({ message: "error", detail: "exists in wishlist!" });
  }

  wishlistArray.push(req.body.product_id);
  const isAddedToWishlist = await customerModel.findByIdAndUpdate(req.user.id, {
    wishlists: wishlistArray,
  });
  if (isAddedToWishlist) {
    return res.status(200).json({ message: "success" });
  } else {
    return res
      .status(200)
      .json({ message: "error", detail: "something went wrong!" });
  }
};
const removeToWishlist = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);

  const wishlistArray = customerData.wishlists;

  if (!wishlistArray.includes(req.body.product_id)) {
    return res
      .status(200)
      .json({ message: "error", detail: "not exists in wishlist!" });
  }

  const newWishlistArray = wishlistArray.filter(
    (value) => value !== req.body.product_id
  );
  const isRemovedToWishlist = await customerModel.findByIdAndUpdate(
    req.user.id,
    {
      wishlists: newWishlistArray,
    }
  );
  if (isRemovedToWishlist) {
    return res.status(200).json({ message: "success" });
  } else {
    return res
      .status(200)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

module.exports = { getAllWishlist, addToWishlist, removeToWishlist };
