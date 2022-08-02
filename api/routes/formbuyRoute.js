const router = require("express").Router();
const FormBuyControl = require("../controllers/formbuyControls")

router.put("/:id",  FormBuyControl.sabeForm )
router.get("/:id", FormBuyControl.getFormBuy)

module.exports = router;