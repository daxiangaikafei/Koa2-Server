import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";


const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.sys;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./login";

router.all("/account4Client/login",login)



module.exports = router