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
exports.deletePlayerController = exports.updatePlayerController = exports.createPlayerController = exports.getPlayerController = exports.getPlayersController = void 0;
const players_service_1 = require("./players-service");
const getPlayersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield (0, players_service_1.getPlayersService)();
    res.json(players);
});
exports.getPlayersController = getPlayersController;
const getPlayerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const player = yield (0, players_service_1.getPlayerService)(+id);
    res.json(player);
});
exports.getPlayerController = getPlayerController;
const createPlayerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerData = req.body;
    const player = yield (0, players_service_1.createPlayerService)(playerData);
    res.json(player);
});
exports.createPlayerController = createPlayerController;
const updatePlayerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const updateFields = req.body;
    const player = yield (0, players_service_1.updatePlayerService)(+id, updateFields);
    res.json(player);
});
exports.updatePlayerController = updatePlayerController;
const deletePlayerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const player = yield (0, players_service_1.deletePlayerService)(+id);
    res.status(200).json(null);
});
exports.deletePlayerController = deletePlayerController;
