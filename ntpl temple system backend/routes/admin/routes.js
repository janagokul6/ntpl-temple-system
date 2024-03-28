const router = require("express").Router();
const handlePageAccess = require("../../middleware/pageAceess.middleware");

const userController = require("../../controller/admin/userController");
const categoriesController = require("../../controller/admin/categoriesController");
const productsController = require("../../controller/admin/productsController");
const faqController = require("../../controller/admin/faqController");
const websiteDetailsController = require("../../controller/admin/websiteDetailsController");

// ------------------ roles
const allRoles = ["user", "categories", "products","faq", "website-details"];
router.get("/roles/getAll", (req, res) => {
  res.status(200).json({ message: "success", data: allRoles });
});
// ------------------ roles

// ------------------ user
router.post(
  "/user/add",
  handlePageAccess(allRoles[0], "add"),
  userController.add
);
router.get(
  "/user/getAll",
  handlePageAccess(allRoles[0], "view"),
  userController.get
);
router.delete(
  "/user/delete/:itemId",
  handlePageAccess(allRoles[0], "delete"),
  userController.deleteData
);
router.put(
  "/user/update/:itemId",
  handlePageAccess(allRoles[0], "update"),
  userController.updateDate
);
// ------------------ user
// ------------------ user
router.post(
  "/categories/add",
  handlePageAccess(allRoles[1], "add"),
  categoriesController.add
);
router.get(
  "/categories/getAll",
  handlePageAccess(allRoles[1], "view"),
  categoriesController.get
);
router.delete(
  "/categories/delete/:itemId",
  handlePageAccess(allRoles[1], "delete"),
  categoriesController.deleteData
);
router.put(
  "/categories/update/:itemId",
  handlePageAccess(allRoles[1], "update"),
  categoriesController.updateDate
);
// ------------------ user
// ------------------ user
router.post(
  "/products/add",
  handlePageAccess(allRoles[1], "add"),
  productsController.add
);
router.get(
  "/products/getAll",
  handlePageAccess(allRoles[1], "view"),
  productsController.get
);
router.delete(
  "/products/delete/:itemId",
  handlePageAccess(allRoles[1], "delete"),
  productsController.deleteData
);
router.put(
  "/products/update/:itemId",
  handlePageAccess(allRoles[1], "update"),
  productsController.updateDate
);

// ------------------ products



router.post(
  "/faq/add",
  handlePageAccess(allRoles[3], "add"),
    faqController.add
);
router.get(
  "/faq/getAll",
  handlePageAccess(allRoles[3], "view"),
    faqController.get
);
router.delete(
  "/faq/delete/:itemId",
  handlePageAccess(allRoles[3], "delete"),
  faqController.deleteData
);
router.put(
  "/faq/update/:itemId",
  handlePageAccess(allRoles[3], "update"),
    faqController.updateDate
);



// ------------------ faq


router.post(
  "/website-details/add",
  handlePageAccess(allRoles[3], "add"),
    websiteDetailsController.add
);
router.get(
  "/website-details/getAll",
  handlePageAccess(allRoles[3], "view"),
    websiteDetailsController.get
);





// ------------------ website-details



module.exports = router;
