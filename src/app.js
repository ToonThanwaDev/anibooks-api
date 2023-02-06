require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/authRoute");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: { messsage: "too many request, please try again later" }
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.cyanBright.bold(`Server is running on port: ${port}`))
);
