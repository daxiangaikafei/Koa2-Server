import * as Router from "koa-router";
import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

import * as json from "./../../config/index";
const routes:any=json
const config = routes.routes.qbii;
let router = new Router();
router.prefix(config.prefix);

let fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

let result:Result = new Result();

router.get("/user/userId",function(ctx,next){
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
})



module.exports = router
//export default router;