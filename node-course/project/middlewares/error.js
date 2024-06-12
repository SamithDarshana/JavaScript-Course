const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }), // Log unhandled exceptions
  ],
});

module.exports = function (err, req, res, next) {
  logger.info("This is an info message");
  logger.warn("This is a warning message");
  logger.error(
    "This is an error message with a stack trace",
    new Error("Some error")
  );

  res.status(500).send("Something failed");
};
// log error

//winston.error(err.message, err);

//error

//warn

//info
//verbose
//debug
//silly
