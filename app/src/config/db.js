"user strict";

/** 모듈 Imoport */
const mysql = require("mysql");

// DB 접속 설정
const connSeting = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// DB 커넥션 생성
const db = mysql.createConnection(connSeting);

// DB 접속
db.connect();

// DB 실행 테스트
// const sql = "SELECT * FROM test_user";
// db.query(sql, (err, result, fields) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success: DB 접속 성공");
//   }
// });
// db.end();

module.exports = db;
