const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
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
