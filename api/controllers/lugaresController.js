const { ArgentinaModel } = require('../schemas/lugares/Argentina.schema');
const { colombiaModel } = require('../schemas/lugares/Colombia.schema')



exports.getLugares = async (req, res) => {
    let { pais } = req.query

    try {
        if (pais === "col") {
            let lugares = await colombiaModel.find().exec()
            return res.send(lugares)
        }
    
        if (pais === "arg") {
            let lugares = await ArgentinaModel.find().exec()
            return res.send(lugares)
        }
    } catch (error) {
        
    }
   
    // if (col) {
    //     let lugares = await colombiaModel.find().exec()
    // return res.send(lugares)
    // }
    res.send()

}