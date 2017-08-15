import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import localConfig from './../../config'


const config = localConfig.routes.item;

const router:Router = new Router();
router.prefix(config.prefix);

import * as User from "./user";

router.get("/user/checkLogin", User.checkLogin);
router.get("/user/login",User.login);
router.get("/weixin/info",User.getWXInfo)
// router.get("/user/info",User.getUserInfo);

import * as Exc from "./exc";
router.post("/wx/qiniu/upload",Exc.wxUpImage)



module.exports = router;