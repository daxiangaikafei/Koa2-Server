import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import {template} from "lodash";
import Config from '../../interface/LocalConfig'

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);



export const login = function(ctx,next){
	//console.log("userId:",ctx.userId);
	let result:Result = new Result();
	let {userId} = ctx;
	return fetch.getData("/api/user/"+userId+"/userId",{},"GET").then((data:any)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

export const news = function(ctx,next){
	let result:Result = new Result();
	console.log("userId:",ctx.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

export const isFinishNews = function(ctx,next){
	let result:Result = new Result();
	console.log("userId:",ctx.userId);
	return fetch.getData("/api/news/isFinishNews.html",{},"POST").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};



export const getUserLevel = function(ctx,next){
	//console.log("userId:",ctx.userId);
	let result:Result = new Result();
	let {userId} = ctx.request.body;
	//console.log(param);
	//"url": "/api/user/${userId}/level",
	return fetch.getData("/api/user/"+userId+"/level",{},"GET").then((data:any)=>{
		if(data.returnCode===0){
			result.success(data.data);
			ctx.body=result.getValue();
		}else{
			ctx.body = result.error(data.returnCode,data.message);
		}
		
	})
};