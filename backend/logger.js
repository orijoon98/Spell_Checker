const winston = require('winston');

const format = winston.format.combine(
  winston.format.timestamp({ format: ' YYYY-MM-DD HH:MM:SS ||' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`
  )
);

const logger = winston.createLogger({
  format,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
