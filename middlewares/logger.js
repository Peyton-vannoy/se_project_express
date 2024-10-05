const winston = require('winston');
const expressWinston = require('express-winston');

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp}) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
})
