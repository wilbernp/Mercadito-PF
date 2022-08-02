const router = require("express").Router();
const paypalController = require("../controllers/paypalControllers")
const Auth = require("../middleware/Auth");

router.post("/create-payment/:id", paypalController.createPayment);
// router.get("/execute-payment", paypalController.executePayment)





module.exports = router;