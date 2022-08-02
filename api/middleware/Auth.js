const jwt = require("jsonwebtoken");
let userModel= require("../schemas/User")

const Auth = async (req, res, next) => {
  let token = req.header("Authorization");


  // Se válida sí existe token en header en bearer
  if (!token) return res.status(401).send({ message: "Sin autorización" });

  // Se obtiene token
  token = token.split(" ")[1];

  // Se válida si existe token
  if (!token) return res.status(401).send({ message: "Sin autorización" });
  try {
    // Se válida la autenticidad de token
    const payload = jwt.verify(token, process.env.SECRET);
    // Se guarda el usuario (id) en la req para el controlador
    req.usuario = payload;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "Sin autorización" });
  }
};

module.exports = Auth;
