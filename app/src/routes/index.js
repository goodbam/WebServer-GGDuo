"use strict";

/** Import */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const mainService = require("../controller/service/main.serivce");

const mainCtrl = require("../controller/main.controller");

// POST: localhost:3000/login
router.post("/login", mainCtrl.output.login);

// GET: localhost:3000/refreshtoken
router.get("/refreshtoken", mainCtrl.output.refreshToken);

/** Export */
module.exports = router;
