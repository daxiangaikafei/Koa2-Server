
import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

import Token from "./../../library/help/token";
import VerifyUser from "./../../library/verifyUser";

const moment = require("moment");

const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.sys;


const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

const result:Result = new Result();

export const login = function(ctx,next){
	//let token = ctx.cookies.get("token");
	let token = verifyUser.getToken(ctx);
	return verifyUser.verifyToken(token).then((info)=>{
		ctx.body={
			"success": true,
			"returnCode": 0,
			"message": "ok"
		}
	}).catch(()=>{
		return smallLogin(ctx,next);
	})


	
};

const smallLogin = function(ctx,next){
	 let searchParam  = ctx.request.fields;

	return fetch.getData("/api/account4Client/login",searchParam||{st:"ST-696-RwCyd5s3fye1Bf02AL4c-cas"},"POST",{},"form-data").then((data:any)=>{

		if(data.returnCode===0){
			let userId = data.data.userId;
			let token = tokenHelp.build(data.data.userId);
			verifyUser.saveData(token,userId);
			verifyUser.setCookie(ctx,"token",token+","+userId);
			ctx.body={
				"success": true,
				"returnCode": 0,
				"message": "ok"
			}
		}else{
			ctx.body=data
		}
		//result.success({});
		
	})
}

