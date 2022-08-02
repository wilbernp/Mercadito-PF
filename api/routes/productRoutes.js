const router = require("express").Router();
const proyectController = require("../controllers/proyectController");
const Auth = require("../middleware/Auth");

// Get all products
router.get("/", proyectController.getProducts);

// Create Product
router.post("/", proyectController.createProduct);

// Get one product
router.get("/:id", proyectController.getProduct);

router.put("/:id", proyectController.updateProduct)



module.exports = router;
