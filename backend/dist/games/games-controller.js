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
exports.setGameController = exports.getGameController = exports.getGamesController = void 0;
const games_services_1 = require("./games-services");
const getGamesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield (0, games_services_1.getGamesService)();
    res.status(200).json(games);
});
exports.getGamesController = getGamesController;
const getGameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const game = yield (0, games_services_1.getGameService)(+id);
    res.status(200).json(game);
});
exports.getGameController = getGameController;
const setGameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield (0, games_services_1.setGameService)();
    res.status(200).json(game);
});
exports.setGameController = setGameController;
