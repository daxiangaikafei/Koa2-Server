import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import localConfig from './../../config'

const config = localConfig.config.routes.item;
const router:Router = new Router();
router.prefix(config.prefix);

import * as User from "./user";
import {all} from "./all";

router.get("/user/checkLogin", User.checkLogin);

const routes = config.routes;
for(var key in routes){
    router.all(key, all);
}

router.get("/user/login",User.login);
router.get("/user/info",User.getUserInfo);
module.exports = router;