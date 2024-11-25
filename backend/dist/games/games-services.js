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
exports.setWinnerTeam = exports.setGameService = exports.getGameService = exports.getGamesService = void 0;
const db_1 = require("../db");
const toMySQLTime_1 = require("../shared/toMySQLTime");
const getGamesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield db_1.dbPool.query(`SELECT * FROM games`);
    return games;
});
exports.getGamesService = getGamesService;
const getGameService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield db_1.dbPool.query(`SELECT * FROM games WHERE game_id = ?`, id);
    return game;
});
exports.getGameService = getGameService;
const setGameService = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, toMySQLTime_1.toMySQLTime)(new Date());
    const game = yield db_1.dbPool.query(`INSERT INTO games (date) VALUES (?)`, date);
    return game[0].insertId;
});
exports.setGameService = setGameService;
const setWinnerTeam = (teamId, gameId) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield db_1.dbPool.query('UPDATE games SET winner_team_id = ? WHERE game_id = ?', [teamId, gameId]);
    return game;
});
exports.setWinnerTeam = setWinnerTeam;
