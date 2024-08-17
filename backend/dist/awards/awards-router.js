"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const awards_controller_1 = require("./awards-controller");
exports.router = (0, express_1.Router)();
exports.router.get('/', awards_controller_1.getAwardController);
exports.router.post('/', awards_controller_1.setAwardController);
