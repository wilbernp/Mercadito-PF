const router = require("express").Router();
const proyectController = require("../controllers/proyectController");
const Auth = require("../middleware/Auth");


// Get Features
router.get("/", proyectController.getFeatures);

module.exports = router;