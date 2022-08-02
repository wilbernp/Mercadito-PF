const { productModel } = require("../schemas/products.schema");
const { v4: uuidv4 } = require('uuid');

exports.createProduct = async (req, res) => {

  let id = req.usuario
  console.log(id)
  let product = req.body;
  let {title, ram, modelo, marca, almacenamiento} = req.body
  product.price = Number(product.price);
  product.stock = Number(product.stock);
  product.id = uuidv4()
  product.sales=0

  let t 
  if (ram && modelo) {
    t = `${title} ${marca} ${modelo} ${ram}GB RAM ${almacenamiento}GB`
  } else{
    t = title
  }

  product.name = t
  console.log(t)

  try {
    const productCreated = new productModel(product);
  await productCreated.save();
  res.sendStatus(201);
  } catch (error) {
    console.log(error)
  }
  
};

exports.getProducts = async (req, res) => {
  const { category, sort, order, name } = req.query;
  // console.log(name)
  let page = req.query.page || 0;
  let limit = req.query.limit || 16;
  let start = page * limit;

  let query = {}

    if (category) {
        query.category = category
    } else if (name) {
      
        query.name=new RegExp(`^${name}|\\s${name}`, "i")
    }

  try {
    if (name || category) {
      console.log(sort, " ", order)
      let promiseLength = productModel.find(query).count().exec();
      let promiseProducts = productModel
        .find(query)
        .limit(Number(limit))
        .skip(Number(start))
        .sort({[sort]: order})
        // .sort(order === "asc" ? sort : order === "desc" && { [sort]: -1 })
        .exec();

      let [products, length] = await Promise.all([
        promiseProducts,
        promiseLength,
      ]);
      let totalPages = Math.ceil(length / limit);
      return res.send({ data: { totalPages, totalProducts:length }, products });
    }

    
    let promiseProducts = productModel
      .find()
      .limit(Number(limit))
      .skip(Number(start))
      .sort({[sort||"createdAt"]: order||"desc"})
      .exec();
    let promiseLength = productModel.find().count().exec();

    let [products, length] = await Promise.all([
      promiseProducts,
      promiseLength,
    ]);
    let totalPages = Math.ceil(length / limit);
    res.send({ data: { totalPages, totalProducts:length }, products });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let product = await productModel.findById(id).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

let arr = [
  "name",
  "price",
  "stock",
  "description",
  "image",
  "almacenamiento",
  "ram",
  "marca",
  "modelo",
  "bateria",
  "frecuencia",
  "resolucion",
  "duracion_bateria",
  "potencia",
  "litros",
  "RPM",
  "capacidad_de_lavado",
  "tipo",
];

exports.getFeatures = async (req, res) => {
  let query = req.query;
  let product = await productModel.findOne(query).exec();
  let features = [];
  for (const key in product) {
    if (arr.includes(key)) {
      features.push(key);
    }

    // console.log(key)
  }

  console.log(features);

  res.send(product);
};

// PUT http://localhost:3001/products/:id-product
exports.updateProduct = async(req, res)=>{
  let update = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  console.log(update)
  res.send(update)
}
