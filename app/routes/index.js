"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routers_qbii = require("./../modular/qbii/index");
var routers_good = require("./../modular/good/index");
var router = require("koa-router");
console.log(router, '22222');
var routes = [
    routers_qbii,
    routers_good
];
//module.exports = router
exports.default = routes;
//# sourceMappingURL=index.js.map