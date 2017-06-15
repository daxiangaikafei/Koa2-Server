import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import {template} from "lodash";
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

export const isFinishNews = function(ctx,next){
	let result:Result = new Result();
	console.log("userId:",ctx.state.userInfo.userId);
	return fetch.getData("/api/news/isFinishNews.html",{},"POST").then((data)=>{
		//result.success(data);
		//ctx.body=result.getValue();
        ctx.body = data;
	})
};

// mqbii.com/api/news/isFinishNews.html
// mqbii.com/api/news/isFinishNews.html



//   mqbii.com/api/qbii/news/isFinishNews   