const User = require("../schemas/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  emailRegistroUsuario,
  emailInfoActualizada,
  emailOlvideContrasenia,
  emailInfoNuevacontrasenia,
} = require("../helpers/envioCorreos");

// Permite el registro de nuevos usuarios
exports.signUp = async (req, res) => {
  const { name, lastname, password, email, google, picture } = req.body;

  let passwordE;

  try {
    let user = await User.findOne({ email: email });

    

    // Iniciar Google
    if (!user && google) {
      // Se crea usuario
      let newUser = await new User({
        ...req.body,
        password: passwordE,
        profile_picture: picture,
        // admin:true
      });
      await newUser.save()

      // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
      let token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
        expiresIn: "7d",
      });

      // Email de registro de usuario
      emailRegistroUsuario(email, `${name} ${lastname}`);

      return res.json({
        user: newUser,
        token,
      });
    } else if (user && google) {
      // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
      let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        user: user,
        token,
      });
    }

    // Se verifica la existencia de un email ya registrado
    if (user) {
      return res.status(401).json({ msg: "Usuario ya registrado" });
    }

    // Se realiza hash a la contrase ante de guardarse
    passwordE = await bcrypt.hash(password, 10);

    // Se crea usuario
    let newUser = await new User({
      ...req.body,
      password: passwordE,
    });

    await newUser.save();

    // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
    let token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    // Email de registro de usuario
    emailRegistroUsuario(email, `${name} ${lastname}`);

    res.json({
      user: newUser,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// POST http://localhost:3001/users/signin
// Permite la autenticación de usuarios
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  // console.log(password)

  try {
    // verificar de la existencia del usuario
    let userLogin = await User.findOne({
      email: email,
    });
    // console.log(userLogin.password)

    if (!userLogin) {
      return res.status(404).json({ msg: "Credenciales inválidas" });
    }

    if (!userLogin.isActive) {
      return res.status(404).json({ msg: "Su cuenta esta supendida temporalmente" });
    }

    // verificar la contraseña
    if (await bcrypt.compare(password, userLogin.password)) {
      // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
      let token = jwt.sign({ id: userLogin.id }, process.env.SECRET, {
        expiresIn: "7d",
      });

      return res.json({ user: userLogin, token });
    } else {
      return res.status(404).json({ msg: "Credenciales inválidas" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Permite obtener un usuario
exports.getUser = async (req, res) => {
  try {
    // Se válida la existencia del usuario
    const user = await User.findById(req.usuario.id);

    if (!user) {
      return res.status(404).json({ msg: "No se encontro ningun usuario" });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Actualiza los datos del usuario validando información sensible
exports.actualizarUsuario = async (req, res) => {
  const { name, lastname, password, dni, email, phone, place } = req.body;

  try {
    // Se válida la existencia del usuario
    const user = await User.findById(req.usuario.id);

    if (!user) {
      return res.status(404).json({ msg: "No se encontro ningun usuario" });
    }

    // Se válida la existencia de un email previo registrado
    if (user.email !== email) {
      const correoExistente = await User.findOne({
        where: { email: email },
      });
      if (correoExistente) {
        return res
          .status(400)
          .send({ msg: "El nuevo correo ya está registrado" });
      }
    }

    // Se válida la existencia de un DNI previo registrado
    if (user.dni !== dni) {
      const dniExistente = await User.findOne({
        where: { dni: dni },
      });
      if (dniExistente) {
        return res.status(400).send({ msg: "El nuevo DNI ya está registrado" });
      }
    }

    // Se válida la existencia de un número previo registrado
    if (user.dataValues.phone !== phone) {
      const phoneExistente = await User.findOne({
        where: { phone: phone },
      });
      if (phoneExistente) {
        return res
          .status(400)
          .send({ msg: "El nuevo número ya está registrado" });
      }
    }

    // Se válida el intento de cambio de contraseña en ruta incorrecta
    if (password) {
      return res.status(400).send({ msg: "La password no es modificable" });
    }

    // Se busca el place para poder id en usuario actualizado
    let placeResponse;

    if (place) {
      placeResponse = await Place.findOne({
        where: {
          name: place.toUpperCase(),
        },
      });
      if (!placeResponse) {
        return res.status(404).send({
          msg: "No se encontro la existencia del lugar registrado en nuestra DB",
        });
      }
    }

    // Se actualiza los datos
    user.set({ ...req.body, PlaceId: placeResponse?.dataValues.id });
    await user.save();

    // Función para enviar email
    emailInfoActualizada(email, `${name} ${lastname}`);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Envia email para modificar contraseña y crea token para su validez
exports.olvideContrasenia = async (req, res) => {
  try {
    const { email } = req.body;

    // Se busca la existencia del usuario
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        msg: "No se ha enviado las instrucciones al correo electrónico proporcionado",
      });
    }

    // Se genera token para la vigencia para poder modificar la contraseña
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1m",
    });

    //Función para enviar correo
    emailOlvideContrasenia(email, `${user.name} ${user.lastname}`, token);

    res.status(200).send({
      msg: "Se ha enviado las instrucciones al correo electrónico proporcionado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Permite modificar la contraseña del usuario
exports.nuevaContrasenia = async (req, res) => {
  try {
    const { nuevaPassword } = req.body;
    const { token } = req.params;

    // Se válida la autenticidad de token
    const { id } = jwt.verify(token, process.env.SECRET);

    if (!id) {
      return res.status(400).send({ msg: "Token no válido" });
    }

    // Se válida la existencia del usuario
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send({ msg: "No se puede cambiar la contraseña" });
    }

    // Se generra la nueva contraseña y se guarda
    user.password = await bcrypt.hash(nuevaPassword, 10);

    await user.save();

    emailInfoNuevacontrasenia(user.email, `${user.name} ${user.lastname}`);

    res.status(201).send({ msg: "Se ha cambiado la contraseña éxitosamente" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};


// GET http://localhost:3001/users/user-list
exports.getUsers = async (req, res) =>{
  let users = await User.find().exec()
  res.send(users)
}

// PUT http://localhost:3001/users/ban-user/:id-user
exports.banUser = async (req, res)=>{
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec();
    res.send(user)
} catch (error) {
    console.log(error)
}
}

// PUT http://localhost:3001/users/update-perfil
exports.updatePerfil= async function(req, res){
  let {password}=req.body
  console.log(password)
  let passwordE = await bcrypt.hash(password, 10);

  let userUpdate = await User.findByIdAndUpdate(req.usuario.id, {password:passwordE}, {new:true})
  res.send(userUpdate)
}

// // GET http://localhost:3001/users/:id-user
// exports.getUserID = async(req, res)=>{
//   res.send(req.params.id)
// }
