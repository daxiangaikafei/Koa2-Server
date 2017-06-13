interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";


const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.item;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";
import {all} from "./all";

const routes = config.routes;
for(var key in routes){
    router.all(key, all);
}


router.get("/user/login",login);


module.exports = router;