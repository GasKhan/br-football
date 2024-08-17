"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoalsController = exports.setGoalController = void 0;
const goals_service_1 = require("./goals-service");
const setGoalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, playerId, assistantId } = req.body;
    yield (0, goals_service_1.setGoalService)(gameId, playerId, assistantId);
    res.status(200);
});
exports.setGoalController = setGoalController;
const getGoalsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = req.params['playerId'];
    const goals = yield (0, goals_service_1.getGoalsService)(+playerId);
    res.status(200).json(goals);
});
exports.getGoalsController = getGoalsController;
