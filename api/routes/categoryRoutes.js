const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const Auth = require("../middleware/Auth");

// Get all categories query name
router.get("/", categoryController.getCategories);

// Create Category
router.post("/", categoryController.createCategory);



module.exports = router;
