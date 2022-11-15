"user strict";

const WinstonDaily = require("winston-daily-rotate-file");
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, json, simple, colorize } = format;

const printFormat = {
  file: printf(({ label, timestamp, level }) => {
    return `${timestamp} [${label}] [${level}] :`;
  }),

  console: printf(({ level, message }) => {
    return `[${level}] : ${message}`;
  }),
};

const printLogFormat = {
  file: combine(
    label({
      label: "GGDuo.com",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat.file
  ),

  console: combine(
    colorize(), // 색상 사용
    simple(),
    printFormat.console
  ),
};

const options = {
  file: new transports.File({
    filename: "log.log",
    dirname: "./logs",
    level: "info",
    format: printLogFormat.file,
  }),

  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [
    options.file,

    // error 레벨 로그를 저장할 파일 설정
    new WinstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: "./logs/error",
      filename: "error-%DATE%.log",
      maxFiles: 30,
      zippedArchive: true,
    }),

    // 모든 레벨 로그를 저장할 파일 설정
    new WinstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: "./logs/all",
      filename: "all-%DATE%.log",
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
});

// 개발용 서버일 경우 콘솔까지 찍어준다.
if (process.env.NODE_ENV !== "production") {
  logger.add(options.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
