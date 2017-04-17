import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";


const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";

router.get("/user/userId",login)



module.exports = router