"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var help = require("./../../help/index");
var config = help.envChange({
    "development": function () {
        return require("./env/development");
    },
    "production": function () {
        return require("./env/production");
    },
    "release": function () {
        return require("./env/release");
    }
});
//console.log("系统配置信息为:",config);
module.exports = config;
//# sourceMappingURL=index.js.map