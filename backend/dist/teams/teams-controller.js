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
exports.setTeamController = exports.getTeamsForGameController = void 0;
const teams_service_1 = require("./teams-service");
const getTeamsForGameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params['id'];
    const team = yield (0, teams_service_1.getTeamsForGameService)(+gameId);
    res.status(200).json(team);
});
exports.getTeamsForGameController = getTeamsForGameController;
const setTeamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, playerIds } = req.body;
    yield (0, teams_service_1.setTeamService)(gameId, playerIds);
    res.status(200);
});
exports.setTeamController = setTeamController;
