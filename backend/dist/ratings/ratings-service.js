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
exports.getRatingService = exports.setRatingsService = void 0;
const db_1 = require("../db");
const setRatingsService = (ratings) => __awaiter(void 0, void 0, void 0, function* () {
    const date = db_1.dbPool.query(`SELECT date FROM games WHERE game_id = ?`, ratings[0].gameId);
    const sqlInsertValues = ratings
        .map((ratingObj) => {
        return `( ${Object.values(ratingObj).join(', ')}, ${date} )`;
    })
        .join(', ');
    //TODO: Check for sql injection
    yield db_1.dbPool.query(`
    INSERT INTO ratings_for_game (player_id, game_id, player, rating, date)
    VALUES ${sqlInsertValues}
    `);
});
exports.setRatingsService = setRatingsService;
const getRatingService = (playerId, month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const playerRating = yield db_1.dbPool.query(`SELECT AVG (rating) FROM ratings_for_game 
    WHERE player_id = ? AND MONTH (date) = ? AND YEAR (date) = ? `, [playerId, month, year]);
    return playerRating;
});
exports.getRatingService = getRatingService;
