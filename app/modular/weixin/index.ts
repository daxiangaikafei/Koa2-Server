import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import localConfig from './../../config'

const config = localConfig.config.routes.weixin;
const router:Router = new Router();
router.prefix(config.prefix);


import * as external from "./external";
router.post("/info/:channel",external.setConfig);
router.get("/js/info/:channel",external.getJsInfo);

// import {login} from "./user";
// import {all} from "./all";

// const routes = config.routes;
// for(var key in routes){
//     router.all(key, all);
// }


// router.get("/user/login",login);


module.exports = router;