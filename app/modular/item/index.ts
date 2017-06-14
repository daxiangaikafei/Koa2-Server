import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.item;
const router:Router = new Router();
router.prefix(config.prefix);

import {login, checkLogin} from "./user";
import {all} from "./all";

router.get("/user/checkLogin", checkLogin);

const routes = config.routes;
for(var key in routes){
    router.all(key, all);
}

router.post("/user/login",login);
module.exports = router;