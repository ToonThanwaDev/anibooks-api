// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const shopRoute = require("./routes/shopRoute");
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 5,
    max: 1000,
    message: { messsage: "too many request, please try again later" }
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/", cartRoute);
app.use("/", orderRoute);
app.use("/admin", adminRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(chalk.cyanBright.bold(`Server is running on port: ${port}`)));
