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
module.exports = config;
//# sourceMappingURL=index.js.map