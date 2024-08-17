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
exports.setTeamService = exports.getTeamsForGameService = void 0;
const db_1 = require("../db");
const getTeamsForGameService = (gameId) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield db_1.dbPool.query(`SELECT * FROM teams WHERE game_id = ?`, gameId);
    return teams;
});
exports.getTeamsForGameService = getTeamsForGameService;
const setTeamService = (gameId, playerIdArr) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield db_1.dbPool.query(`INSERT INTO teams (game_id) VALUES (?)`, gameId);
    const playerIdStrforSQL = playerIdArr
        .map((id) => {
        return `(${team[0]}, ${id})`;
    })
        .join(', ');
    yield db_1.dbPool.query(`
    INSERT INTO teams_players (team_id, player_id) VALUES ?`, playerIdStrforSQL);
});
exports.setTeamService = setTeamService;
