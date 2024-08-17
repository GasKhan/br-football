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
exports.getGoalsService = exports.setGoalService = void 0;
const db_1 = require("../db");
const setGoalService = (playerId, gameId, assistantId) => __awaiter(void 0, void 0, void 0, function* () {
    const date = yield db_1.dbPool.query(`
    SELECT date FROM games WHERE game_id = `, gameId);
    const res = yield db_1.dbPool.query(`
    INSERT INTO scores (player_id, game_id,date, ${assistantId ? 'assistant_id' : ''})
    VALUES (?, ?,?, ${assistantId ? '?' : ''})
    `, [playerId, gameId, date, assistantId]);
    return res[0];
});
exports.setGoalService = setGoalService;
const getGoalsService = (playerId) => __awaiter(void 0, void 0, void 0, function* () {
    const goals = yield db_1.dbPool.query(`
      SELECT COUNT (score_id) FROM scores WHERE player_id = ?
    `, playerId);
    return goals[0];
});
exports.getGoalsService = getGoalsService;
