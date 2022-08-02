const {categoriesModel} = require("../schemas/categories.schema");

exports.getCategories = async (req,res)=>{
    let { name } = req.query
    // console.log(name)
    if (name) {
        let type = await categoriesModel.find({ name }).exec()
        let [obj] = type
        return res.send(obj)
    }

    let category = await categoriesModel.find().exec()
    res.send(category)
}

exports.createCategory = async (req,res)=>{
    const c = new categoriesModel(req.body)
    await c.save()
    res.send(c)
}