"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ratings_controller_1 = require("./ratings-controller");
exports.router = (0, express_1.Router)();
exports.router.post('/', ratings_controller_1.setRatingsController);
exports.router.get('/:playerId', ratings_controller_1.getRatingController);
