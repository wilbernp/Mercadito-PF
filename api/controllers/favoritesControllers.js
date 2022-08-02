
let { favoritesModel } = require("../schemas/favorites.schema")

exports.createFavorites = async (req, res) => {

    // res.send('post a /favorites'+req.params.id)
    let { id } = req.params
    let id_user = req.usuario.id

    try {
        let favorite = new favoritesModel({
            product: id,
            user: id_user
        })
        await favorite.save()
        res.status(201).send({ msg: "create succesfull" })
    } catch (error) {
        console.log(error)
    }

}

exports.getFavorites = async (req, res) => {
    let id = req.usuario.id

    try {
        let favorites = await favoritesModel.find({ user: id })
            .populate("product user")
            .exec()

            
        res.send(favorites)
    } catch (error) {
        console.log(error)
    }

}

exports.deleteFavorites = async (req, res) => {

    try {
        const favorite = await favoritesModel.findByIdAndDelete(req.params.id);
        if (!favorite) res.status(404).send("No item found");
        res.status(200).send({ msg: "deleted succesful" });
    } catch (error) {
        console.log(error)
    }

}


exports.getfavoriteID = async (req, res) => {
    let id = req.params.id

    let favorite = await favoritesModel.findOne({product:id})
        .populate("product user")
        .exec()
    res.send(favorite)
}


