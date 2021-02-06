require("dotenv").config({ path: ".env" });
require("express-async-errors");
const winston = require("winston"); //logger - logging errors
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/moviezone", level: "error" }));
winston.add(new winston.transports.File({ filename: 'uncaught-exceptions.log', handleExceptions: true, handleRejections: true}));

require("./startup/prod")(app);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb://localhost/moviezone",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("Connected with MovieZone DataBase"))
  .catch((err) => console.error("Could not connect with mongoDB"));

// mongoose.connect(config.get('db'), {useNewUrlParser: true}, { useUnifiedTopology: true })
//   .then(() => console.log('Connected with MovieZone DataBase'))
//   .catch(err => console.error('Could not connect with mongoDB'));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
