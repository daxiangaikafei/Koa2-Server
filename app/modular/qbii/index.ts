import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";

const localConfig:LocalConfig = require("./../../config/index");
const config = localConfig.routes.qbii;
const router:Router = new Router();
router.prefix(config.prefix);

import {login,isFinishNews} from "./user";
import {all} from "./all";

//router.get("/user/userId",login);
router.post("/news/isFinishNews",isFinishNews);


// console.log("xxxx",getUserLevel);
// router.post("/v1/user/getUserLevel",getUserLevel);

const routes = config.routes;
for(var key in routes){
    router.all(key,all);
}

//router.all(new RegExp('^'+config.prefix.replace(/\//g,"\\/")+'(?:\/|$)'),all); 
module.exports = router;