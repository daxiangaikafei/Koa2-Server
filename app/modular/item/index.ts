import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.item;
const router:Router = new Router();
router.prefix(config.prefix);

import * as User from "./user";
import {all} from "./all";

router.get("/user/checkLogin", User.checkLogin);
// router.get("/user/login", login);

const routes = config.routes;
for(var key in routes){
    router.all(key, all);
}

router.post("/user/login",User.login);
router.post("/user/info",User.getUserInfo);
module.exports = router;