"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const players_router_1 = require("./players/players-router");
const games_router_1 = require("./games/games-router");
const teams_router_1 = require("./teams/teams-router");
const awards_router_1 = require("./awards/awards-router");
const goals_router_1 = require("./goals/goals-router");
const ratings_router_1 = require("./ratings/ratings-router");
const app = (0, express_1.default)();
const PORT = 5000;
app.use('/api/players', players_router_1.router);
app.use('/api/games', games_router_1.router);
app.use('/api/teams', teams_router_1.router);
app.use('/api/awards', awards_router_1.router);
app.use('/api/goals', goals_router_1.router);
app.use('/api/ratings', ratings_router_1.router);
app.get('/api', (req, res) => {
    res.send('Got your request');
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
