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
exports.deletePlayerService = exports.updatePlayerService = exports.createPlayerService = exports.getPlayerService = exports.getPlayersService = void 0;
const db_1 = require("../db");
const getPlayersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = db_1.dbPool.query(`SELECT * FROM players`);
    return players;
});
exports.getPlayersService = getPlayersService;
const getPlayerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = db_1.dbPool.query(`SELECT * FROM players WHERE player_id = ?`, id);
    return player;
});
exports.getPlayerService = getPlayerService;
const createPlayerService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const player = db_1.dbPool.query(`INSERT INTO players (name) VALUES (?)`, userData.name);
    return player;
});
exports.createPlayerService = createPlayerService;
const updatePlayerService = (id, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
    const player = db_1.dbPool.query(`UPDATE players SET player_name = ? WHERE player_id = ?`, [updateFields.name, id]);
    return player;
});
exports.updatePlayerService = updatePlayerService;
const deletePlayerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = db_1.dbPool.query(`DELETE FROM players WHERE player_id = ?`, id);
    return player;
});
exports.deletePlayerService = deletePlayerService;
