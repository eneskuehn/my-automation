import winston from "winston";

winston.addColors({
  info: "green",
  warn: "yellow",
  error: "red",
  debug: "cyan",
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    //implement output to file or database as needed
  ],
});
