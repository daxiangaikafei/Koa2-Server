import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";


const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";
import {all} from "./all";

router.get("/user/userId",login);

const routes = config.routes;
for(var key in routes){
    router.all(key,all);
}

//router.all(new RegExp('^'+config.prefix.replace(/\//g,"\\/")+'(?:\/|$)'),all); 


module.exports = router;