"use strict";

//** Import */
const app = require("../app");
const logger = require("../src/config/logger");
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  logger.log("info", `Port ${PORT} -> 서버 실행 `);
});
