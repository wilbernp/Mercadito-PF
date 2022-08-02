const router = require("express").Router();
const lugaresController = require('../controllers/lugaresController');
const Auth = require("../middleware/Auth");

// Get all products
router.get('/', lugaresController.getLugares)


module.exports = router;
