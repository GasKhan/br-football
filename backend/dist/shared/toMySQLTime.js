"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMySQLTime = toMySQLTime;
function toMySQLTime(jsTime) {
    return jsTime.toISOString().split('T')[0];
}
