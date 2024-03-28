const router = require("express").Router();
const {
  getAllWishlist,
  addToWishlist,
  removeToWishlist,
} = require("../../controller/customer/wishlistController");
const {
  getAllCart,
  addToCart,
  removeToCart,
} = require("../../controller/customer/cartController");

router.get("/get-wishlist", getAllWishlist);
router.post("/add-wishlist", addToWishlist);
router.post("/remove-wishlist", removeToWishlist);

router.get("/get-cart", getAllCart);
router.post("/add-cart", addToCart);
router.post("/remove-cart", removeToCart);

module.exports = router;
