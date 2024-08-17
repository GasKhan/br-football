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
exports.getRatingController = exports.setRatingsController = void 0;
const ratings_service_1 = require("./ratings-service");
const setRatingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ratingsArr = req.body;
    yield (0, ratings_service_1.setRatingsService)(ratingsArr);
    res.status(200);
});
exports.setRatingsController = setRatingsController;
const getRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerId = req.params['playerId'];
    const { month, year } = req.body;
    const rating = yield (0, ratings_service_1.getRatingService)(+playerId, month, year);
    res.status(200).json(rating);
});
exports.getRatingController = getRatingController;
