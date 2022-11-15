"use strict";

/** 모듈 **/
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config();

/** 라우팅 **/
const main = require("./src/routes/index");

/** 앱 셋팅 및 미들 웨어 등록 **/
// 클라언트와 json 형식의 데이터로 통신하기 위해 사용됨
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
// 쿠기의 데이터를 읽고 쓰기 위해 사용됨
app.use(cookieParser());
// 클라이언트에서 서버간 origin이 다른 상황에서 통신하기 위해 사용됨
app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"], // 사용가능한 메서드
    credentials: true, // 클라이언트와 서버간에 쿠키를 사용해서 통신을 허용
  })
);

app.use("/", main);

module.exports = app;
