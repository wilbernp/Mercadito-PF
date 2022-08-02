require("dotenv").config();
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const Auth = require("../middleware/Auth");

/**
 * Crear un nuevo usuario
 */
router.post("/signup", userController.signUp);

/**
 *  Permitir iniciar sesión
 */
router.post("/signin", userController.signIn);

/**
 * Permite traer obtener el usuario
 */
router.get("/", Auth, userController.getUser);

/**
 * Permite actulizar usuario
 */
router.put("/", Auth, userController.actualizarUsuario);

/**
 * Permite enviar correo para instrucciones para nueva contraseña
 */
router.post("/olvide-contrasenia", userController.olvideContrasenia);

/**
 * Permite cambiar contraseña con el token enviado
 */
router.post("/nueva-contrasenia/:token", userController.nuevaContrasenia);

router.get("/user-list", userController.getUsers)
router.put("/ban-user/:id", userController.banUser)
router.put("/update-perfil", Auth, userController.updatePerfil)
// router.get("/:id", userController.getUserID)

module.exports = router;
