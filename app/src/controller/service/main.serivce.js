"use strict";

const axios = require("axios");
const logger = require("../../config/logger");
const jwt = require("jsonwebtoken");
const UserRepository = require("../../models/UserRepository");

const login = {
  naver: async (req, res) => {
    const userRepository = new UserRepository();

    logger.info("MainService.login.naver 실행");
    const header = "Bearer " + req.body.accessToken;
    const api_url = "https://openapi.naver.com/v1/nid/me";
    const headers = {
      headers: {
        Authorization: header,
      },
    };

    try {
      // 네이버로부터 프로필 가져옴
      const response = await getAxios(api_url, headers);
      // 토큰 생성 및 회원가입을 위한 유저 정보 셋팅
      const userInfo = {
        name: response.name,
        email: response.email,
        provider: "naver",
        providerId: response.id,
      };
      // 이미 가입된 회원인지 조회
      const user = await userRepository.findByProviderId(response.id);

      if (!user) {
        // 회원가입 진행
        await userRepository.save(userInfo);

        return await createToken(userInfo);
      } else {
        return await createToken(userInfo);
      }
    } catch (error) {
      logger.error("MainService.login.naver => " + error);
      return { suceess: false };
    }
  },
};

// access token을 갱신
const refreshToken = async (req, res) => {
  try {
    const userRepository = new UserRepository();

    const token = req.cookies.accessToken;
    // 유효한 토큰인지를 확인
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await userRepository.findByProviderId(data.providerId);

    if (userData) {
      // access Token 새로 발급
      const accessToken = jwt.sign(
        {
          //유저 정보를 담음
          id: userData.id,
          providerId: userData.providerId,
          email: userData.email,
        },
        process.env.ACCESS_SECRET,
        {
          // 토큰 유효기간 설정
          expiresIn: "10m",
          issuer: "GGDuo.com",
        }
      );

      logger.info(`refresh token 실행 완료 `);
      return {
        success: true,
        accessToken: accessToken,
      };
    }
  } catch (error) {
    logger.error(`refresh token 에러 => ${error}`);
    return {
      success: false,
      msg: "refresh token 에러",
    };
  }
};

// access token, refresh token 생성 함수
const createToken = async (userInfo) => {
  // access token 발급
  try {
    const accessToken = jwt.sign(
      {
        //유저 정보를 담음
        id: userInfo.id,
        providerId: userInfo.providerId,
        email: userInfo.email,
      },
      process.env.ACCESS_SECRET,
      {
        // 토큰 유효기간 설정
        expiresIn: "10m",
        issuer: "GGDuo.com",
      }
    );

    // refresh token 발급
    const refreshToken = jwt.sign(
      {
        //유저 정보를 담음
        id: userInfo.id,
        providerId: userInfo.providerId,
        email: userInfo.email,
      },
      process.env.REFRESH_SECRET,
      {
        // 토큰 유효기간 설정
        expiresIn: "24h",
        issuer: "GGDuo.com",
      }
    );

    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    logger.error(`asscess token 생성 에러 => ${error}`);
    return {
      success: false,
      msg: "asscess token 생성 에러",
    };
  }
};

// 네이버에서 프로필 정보를 받아오는 함수
const getAxios = async (api_url, headers) => {
  try {
    const result = await axios.get(api_url, headers);
    const response = result.data.response;

    logger.info(`Axios 실행 완료`);
    return response;
  } catch (error) {
    const errInfo = {
      suceess: false,
      status: error.response.status,
      msg: error.response.statusText,
    };
    logger.error(
      `Axios 통신 에러 => {"status": ${errInfo.status}, "msg": ${errInfo.msg}}`
    );
    return errInfo;
  }
};

module.exports = {
  refreshToken,
  login,
};
