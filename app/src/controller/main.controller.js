"use strict";

const mainService = require("./service/main.serivce");

// 쿠키 설정 값
const cookieOpt = {
  secure: false, // 해당 값이 true이면 https에서만 사용 가능
  httpOnly: true, // HTTP 접근 외에 JS 같은 녀석으로 접근 불가능
};

const output = {
  login: async (req, res) => {
    const response = await mainService.login.naver(req);

    // 쿠키에 담아서 토큰 전송
    res.cookie("accessToken", response.accessToken, cookieOpt);
    res.cookie("refreshToken", response.refreshToken, cookieOpt);

    return res.status(200).json(response);
  },

  refreshToken: async (req, res) => {
    const response = await mainService.refreshToken(req);
    res.cookie("accessToken", response.accessToken, cookieOpt);

    return res.status(200).json(response);
  },
};

module.exports = {
  output,
};
