import * as Router from "koa-router"
import Fetch from "./../../library/help/fetch"
import localConfig from "./../../config"

const config = localConfig.routes.sys;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./login";

router.all("/account4Client/login",login);


import {isFinishNews} from "./qbiiExc";
//特意为qbii客户端修改的
router.post("/news/isFinishNews.html",isFinishNews)



module.exports = router