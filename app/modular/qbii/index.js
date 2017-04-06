"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var result_1 = require("./../../library/help/result");
var fetch_1 = require("./../../library/help/fetch");
var LocalConfig = require("./../../config/index");
//import * as json from "./../../config/index";
// const config = routes.qbii;
//const routes:any=json
var config = LocalConfig.routes.qbii;
var router = new Router();
router.prefix(config.prefix);
var fetch = new fetch_1.default(config.domain, config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);
var result = new result_1.default();
console.log(config.prefix);
router.get("/user/userId", function (ctx, next) {
    return fetch.getData("/api/news/getNewsList.html", {}, "GET").then(function (data) {
        result.success(data);
        ctx.body = result.getValue();
    });
});
module.exports = router;
//export default router; 
//# sourceMappingURL=index.js.map