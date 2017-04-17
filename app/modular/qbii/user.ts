
import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.sys;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

const result:Result = new Result();

export const login = function(ctx,next){
	//console.log("userId:",ctx.userId);
	let {userId} = ctx;
	return fetch.getData("/api/user/"+userId+"/userId",{},"GET").then((data:any)=>{
		result.success(data.user);
		ctx.body=result.getValue();
	})
};

export const news = function(ctx,next){
	console.log("userId:",ctx.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

