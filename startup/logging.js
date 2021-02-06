const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/moviezone",
      level: "error",
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "uncaught-exceptions.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
