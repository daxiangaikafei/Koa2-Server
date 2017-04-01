"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../help/index");
// import development from "./env/development";
// import production from "./env/production";
// import release from "./env/release";
//console.log(envChange);
var config = index_1.envChange({
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