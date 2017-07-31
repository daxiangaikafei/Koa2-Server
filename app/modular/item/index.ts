import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";
import localConfig from './../../config'


const config = localConfig.routes.item;

const router:Router = new Router();

// router.use((ctx,next)=>{
//     console.error("-----------------")
//     return next();
// });


//  router.use(async function(ctx,next){
//              console.log("(******************)")
//             // await next();
//             return next();
//             // console.log("..........")
//         })


router.prefix(config.prefix);

import * as User from "./user";
import {all} from "./all";

router.get("/user/checkLogin", User.checkLogin);

const routes = config.routes;
for(var key in routes){
    router.all(key, all);
}

router.get("/user/login",User.login);
router.get("/weixin/info",User.getWXInfo)
// router.get("/user/info",User.getUserInfo);



module.exports = router;