const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let {adminModel} = require("../schemas/admin.schema")

exports.createAdmin = async (req, res) => {
    const { name, password} = req.body;
  
  
    try {
      let user = await adminModel.findOne({ name });
  
  
      if (!user) {
        let passwordE = await bcrypt.hash(password, 10);
   
        let newAdmin = await new adminModel({
          name,
          password: passwordE,
        });
        await newAdmin.save()
  
        let token = jwt.sign({ id: newAdmin._id }, process.env.SECRET, {
          expiresIn: "7d",
        });
  
        return res.json({
          user: {name:newAdmin.name},
          token,
        });
      }
  
      if (user) {
        return res.status(401).json({ msg: "Admin ya registrado" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Algo ha ocurrido" });
    }
  };

  exports.signIn = async (req, res) => {
    const { name, password } = req.body;

    console.log(req.body)
    try {
      // verificar de la existencia del usuario
      let adminLogin = await adminModel.findOne({
        name
      });
  
      if (!adminLogin) {
        return res.status(401).json({ msg: "Credenciales inválidas" });
      }
  
      // verificar la contraseña
      if (await bcrypt.compare(password, adminLogin.password)) {
        // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
        let token = jwt.sign({ id: adminLogin._id }, process.env.SECRET, {
          expiresIn: "7d",
        });
  
        return res.json({ user: adminLogin, token });
      } else {
        return res.status(401).json({ msg: "Credenciales inválidas" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Algo ha ocurrido" });
    }
  };