"use strict";

const db = require("../config/db");
const logger = require("../config/logger");

class UserRepository {
  /** SELECT * FROM user_tb WHERE providerId = {value}*/
  async findByProviderId(providerId) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user_tb WHERE providerId = ?;";

      db.query(sql, [providerId], (err, data) => {
        if (err) {
          logger.error(
            `SQL 에러 => "code": ${err.code}, "msg": ${err.sqlMessage}`
          );
          reject({ success: false, code: err.code, msg: err.sqlMessage });
        } else {
          logger.info(`SQL 실행 완료 => ${sql}`);
          resolve(data[0]);
        }
      });
    });
  }

  /** INSERT INTO user_tb(name, email, provider, providerId) VALUES(?, ?, ?, ?);*/
  async save(userInfo) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO user_tb(name, email, provider, providerId) VALUES(?, ?, ?, ?);";
      const values = [
        userInfo.name,
        userInfo.email,
        userInfo.provider,
        userInfo.providerId,
      ];

      db.query(sql, values, (err) => {
        if (err) {
          logger.error(
            `SQL 에러 => "code": ${err.code}, "msg": ${err.sqlMessage}`
          );
          reject(`{ success: false, code: ${err.code}, msg: ${err.sqlMessage}`);
        } else {
          logger.info(`SQL 실행 완료 => ${sql}`);
          resolve({ success: true });
        }
      });
    });
  }
}

module.exports = UserRepository;
