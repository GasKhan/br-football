"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var PORT = 5000;
app.get('/', function (req, res) {
    res.send('Got your request');
});
app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
