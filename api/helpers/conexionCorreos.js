/**
 * Archivo para verificar conexión con el email para enviar correos
 *
 * @author Andres
 */

const nodemailer = require("nodemailer");

const connectionEmail = () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.CORREO, // generated ethereal user
      pass: process.env.CONTRASENIA, // generated ethereal password
    },
  });

  transporter
    .verify()
    .then(() => {
      console.log("Servidor listo para enviar correos");
    })
    .catch((err) => {
      console.log(`Servidor NO puede enviar correos ${err}`);
    });
};

module.exports = connectionEmail;
