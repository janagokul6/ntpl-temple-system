const customerModel = require("../../model/customer.model");

const getAllCart = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);
  return res.status(200).json({ message: "success", data: customerData.cart });
};

const addToCart = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);

  const CartArray = customerData.cart;

  const isItemExists = CartArray.filter((value) => {
    return value._id === req.body.product_id;
  });

  if (isItemExists.length > 0) {
    return res
      .status(200)
      .json({ message: "error", detail: "exists in Cart!" });
  }

  let newProductObj = {
    _id: req.body.product_id,
    quantity: req.body.product_qty,
  };

  CartArray.push(newProductObj);
  const isAddedToCart = await customerModel.findByIdAndUpdate(req.user.id, {
    cart: CartArray,
  });
  if (isAddedToCart) {
    return res.status(200).json({ message: "success" });
  } else {
    return res
      .status(200)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

const removeToCart = async (req, res, next) => {
  const customerData = await customerModel.findById(req.user.id);

  const CartArray = customerData.cart;
  const isItemExists = CartArray.filter((value) => {
    return value._id === req.body.product_id;
  });
  if (isItemExists < 1) {
    return res
      .status(200)
      .json({ message: "error", detail: "not exists in cart!" });
  }

  const newCartArray = CartArray.filter(
    (value) => value._id !== req.body.product_id
  );
  const isRemovedToCart = await customerModel.findByIdAndUpdate(req.user.id, {
    cart: newCartArray,
  });
  if (isRemovedToCart) {
    return res.status(200).json({ message: "success" });
  } else {
    return res
      .status(200)
      .json({ message: "error", detail: "something went wrong!" });
  }
};

module.exports = { getAllCart, addToCart, removeToCart };
