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
exports.setAwardController = exports.getAwardController = void 0;
const awards_service_1 = require("./awards-service");
const getAwardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { awardTypeId, month } = req.body;
    const award = yield (0, awards_service_1.getAwardService)(awardTypeId, month);
    res.status(200).json(award);
});
exports.getAwardController = getAwardController;
const setAwardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { awardTypeId, playerId } = req.body;
    const award = yield (0, awards_service_1.setAwardService)(awardTypeId, playerId);
    res.status(200).json(award);
});
exports.setAwardController = setAwardController;
