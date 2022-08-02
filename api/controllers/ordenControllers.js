const {Orden} = require("../schemas/Orden.schema");
const {shopingCarModel} = require("../schemas/shopingCar.schema")
const { calc } = require("../funciones/Calc")
exports.crearOrden = async(req,res)=>{
    console.log(req.body,"body")
    if(!req.body) return res.status(404).send({message:"El cliente no envio los parametros"})
    const shopingCar = await shopingCarModel.findByIdAndUpdate(req.params.id,{user:req.body},{new:true})
    const data = calc(shopingCar.products)
    res.send(data)

    // const OrdenCliente = Orden(req.body);
    // OrdenCliente.save()
    //  .then((data)=>{
    //     res.json(data)
    //  })
    //  .catch((e)=>{
    //     res.json({message:e})
    //  })


}

exports.traerTodaslasOrdenes = (req,res)=>{
    sh.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((e)=>{
        res.json({message:e})
    })

}
// --------------------------
exports.getById = async(req,res)=>{

    if(!req.params) return res.status(404).send({message:"Cliente sin parametros"})

    const {id} = req.params

   const getId = await shopingCarModel.findById(id)
   res.send(getId)

}
//-----------------------------
exports.modificarOrden = (req,res)=>{
    if(!req.params || req.body) res.status(404).send({message:"El cliente no tiene parametros"})
    const {id} = req.params
    Orden.findByIdAndUpdate(id,req.body,
        async(err, lineUpdate)=>{
            if(err)return res.status(409).send({message:"error interno"})
            if(!lineUpdate) return res.status(404).send({message: "not found"})
            res.status(200).send({data:lineUpdate});
        })
}

exports.traerOrdenUsuario = (req,res)=>{
    const {userId}= req.body;
    Orden.find({userId:userId})
    .then((data)=>{
        res.json(data)
    })
    .catch((e)=>{
        res.json({message:e})
    })
}