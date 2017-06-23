import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
// import localConfig from "./../../config"


const LocalConfig:LocalConfig = require("./../../config/index");
const config = LocalConfig.routes.good;

const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";

router.all("/user/userId",login)



module.exports = router