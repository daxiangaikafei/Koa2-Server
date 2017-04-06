"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../help/index");
// import development from "./env/development";
// import production from "./env/production";
// import release from "./env/release";
var sysConfig;
//a.localServer = 100;
var config = index_1.envChange({
    "development": function () {
        sysConfig = require("./env/development");
        return sysConfig;
    },
    "production": function () {
        sysConfig = require("./env/development");
        return sysConfig;
    },
    "release": function () {
        sysConfig = require("./env/development");
        return sysConfig;
    }
});
//console.log("系统配置信息为:",config);
module.exports = config;
//# sourceMappingURL=index.js.map