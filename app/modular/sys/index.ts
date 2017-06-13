import * as Router from "koa-router"
import Fetch from "./../../library/help/fetch"
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.sys;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./login";

router.all("/account4Client/login",login);


import {isFinishNews} from "./qbiiExc";
//特意为qbii客户端修改的
router.post("/news/isFinishNews.html",isFinishNews)



module.exports = router