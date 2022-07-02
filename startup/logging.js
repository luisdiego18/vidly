const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // Handle uncaught exceptions
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "unhandledExceptions.log" })
  );

  process.on("unhandledRejetion", (ex) => {
    throw ex;
  });

  // Logging errors
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost/vidly",
  //     level: "info",
  //   })
  // );
};
