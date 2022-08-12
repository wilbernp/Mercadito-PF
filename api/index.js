const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.CORS_URL||"http://localhost:3000"); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/features", require("./routes/featuresRoutes"));
app.use("/favorites", require("./routes/favoritesRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/lugares", require('./routes/lugaresRoutes'))
app.use("/admin", require("./routes/adminRoutes"))
app.use("/shoping", require("./routes/shopingCarRoutes"))
app.use("/paypal", require("./routes/paypalRoutes"))
app.use("/FormBuy",require("./routes/formbuyRoute"))
app.use("/Orden",require("./routes/ordenRoute"))


// Route Deploy
app.get("/api", function (req, res) {
  res.json({ msg: "Servidor funcionando" });
});

const PORT = process.env.PORT || 3001;

// Server
app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("listening at port 3001");
});
