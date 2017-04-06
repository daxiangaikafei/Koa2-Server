"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var help = require("./../../help/index");
var result;
var config = help.envChange({
    "development": function () {
        result = require("./env/development");
        return result;
    },
    "production": function () {
        result = require("./env/development");
        return result;
    },
    "release": function () {
        result = require("./env/development");
        return result;
    }
});
//console.log("系统配置信息为:",config);
module.exports = config;
//# sourceMappingURL=index.js.map