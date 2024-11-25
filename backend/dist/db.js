"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbPool = mysql2_1.default
    .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'br_football',
})
    .promise();
// const getAwards = async () => {
//   const awards = await dbPool.query(`
//     SELECT * FROM award_types;
//     `);
//   console.log(awards);
// };
// getAwards();
