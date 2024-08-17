"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const goals_controller_1 = require("./goals-controller");
exports.router = (0, express_1.Router)();
exports.router.post('/', goals_controller_1.setGoalController);
exports.router.get('/:playerId', goals_controller_1.getGoalsController);
