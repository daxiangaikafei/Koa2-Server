import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

import Token from "./../../library/help/token";
import VerifyUser from "./../../library/verifyUser";
import localConfig from "./../../config"

const moment = require("moment");

const tokenHelp:Token = new Token();
const verifyUser:VerifyUser =
  new VerifyUser();

const config = localConfig.routes.good;

const SSO = localConfig.SSO;


const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

export const login = function(ctx,next){
	let result:Result = new Result();
	console.log("userId:",ctx.state.userInfo.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

