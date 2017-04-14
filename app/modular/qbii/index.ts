import * as Router from "koa-router";
import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";


let LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;
let router:Router = new Router();

router.prefix(config.prefix);

let fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

let result:Result = new Result();

router.get("/user/userId",function(ctx:any,next){
	console.log("userId:",ctx.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
})



module.exports = router