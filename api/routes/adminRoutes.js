const router = require("express").Router();
let AdminController = require("../controllers/adminControllers")
const Auth = require("../middleware/Auth");


router.post("/create", AdminController.createAdmin);
router.post("/signin", AdminController.signIn)



module.exports = router;