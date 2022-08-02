
const { calc } = require("../funciones/Calc")
let { shopingCarModel } = require("../schemas/shopingCar.schema")

// POST http://localhost:3001/shoping/
exports.agregateToCar = async (req, res) => {
    try {
        let shoping = new shopingCarModel()
        await shoping.save()
        res.status(201).send(shoping)
    } catch (error) {
        console.log(error)
    }

}

// GET  http://localhost:3001/shoping/:id-shoping-cart
exports.getProductsInCar = async (req, res) => {

    let {id} = req.params

    try {
        let cartProducts = await shopingCarModel.findById(id)
            .exec()

            cartProducts.products.sort(function (a, b) {
                if (a.createdAt < b.createdAt) {
                  return 1;
                }
                if (a.createdAt > b.createdAt) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
        if (cartProducts.products.length) {
            let info = calc(cartProducts.products)
            return res.send({user:cartProducts.user,products:cartProducts.products, calc:info})
            
        }
        
        res.send(cartProducts)
        
    } catch (error) {
        console.log(error)
    }

}


// DELETE http://localhost:3001/shoping/delet-product/:id-shoping-cart
exports.deleteProductCar = async (req, res) => {
    let {id} = req.params
    let {_id} = req.body
    let cart = await shopingCarModel.findById(id)
    cart.products.pull(_id)
    await cart.save()
    res.send(cart)
}

// PUT http://localhost:3001/shoping/:id-product
exports.updateShopingCar = async (req, res) =>{
    let updated = await shopingCarModel.findOneAndUpdate({"products._id":req.params.id}, 
    {'$set': {"products.$.cantidad": `${req.body.cantidad}`}},
    {new:true})
    console.log(updated)
   res.send(updated)
}


// POST http://localhost:3001/shoping/insert-product/:id-shoping-cart
exports.insertProductToCart = async (req, res) =>{
    let {id} = req.params
    let cart = await shopingCarModel.findById(id)
    cart.products.push(req.body)
    await cart.save()
    res.send(cart)
}

// DELETE http://localhost:3001/shoping/delete-shoping-cart/:id-shoping-cart
exports.deleteShopingCar = async (req, res)=>{
    let {id} = req.params
    await shopingCarModel.findByIdAndDelete(id)
    res.send({msg:"delete succesful"})
}





