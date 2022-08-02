const router = require("express").Router();
const shopingCarController = require('../controllers/shopingCarControllers')
const Auth = require("../middleware/Auth");

router.post("/", shopingCarController.agregateToCar);

router.get("/:id", shopingCarController.getProductsInCar);

router.delete('/delet-product/:id', shopingCarController.deleteProductCar)

router.put("/:id", shopingCarController.updateShopingCar)

router.post("/insert-product/:id", shopingCarController.insertProductToCart)

router.delete("/delete-shoping-cart/:id", shopingCarController.deleteShopingCar)



module.exports = router;