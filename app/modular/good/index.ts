import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.good;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";

router.all("/user/userId",login)



module.exports = router