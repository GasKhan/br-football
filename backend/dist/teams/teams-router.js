"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const teams_controller_1 = require("./teams-controller");
exports.router = (0, express_1.Router)();
exports.router.get('/forGame', teams_controller_1.getTeamsForGameController);
exports.router.post('/', teams_controller_1.setTeamController);
