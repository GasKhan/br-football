"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const games_controller_1 = require("./games-controller");
exports.router = (0, express_1.Router)();
exports.router.get('/', games_controller_1.getGamesController);
exports.router.get('/:id', games_controller_1.getGameController);
exports.router.post('/', games_controller_1.setGameController);
