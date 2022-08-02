const {FormBuymodel} = require('../schemas/FormBuy.schema');
const {shopingCarModel} = require('../schemas/shopingCar.schema');

exports.getFormBuy =async function(req,res){
    try{
        var getForm = await FormBuymodel.findById(req.params.id);
        res.send(getForm);
    }
    catch(e){
        console.log(e)
    }
}

exports.sabeForm = async (req, res) => {
    try{

        const sabe = await shopingCarModel.findByIdAndUpdate(req.params.id, {user: req.body}, {new:true})
        console.log(sabe)
        res.status(200).send(sabe);
    }
    catch(e){
        console.log(e)
    }
}

