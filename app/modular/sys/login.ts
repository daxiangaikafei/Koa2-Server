import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

import Token from "./../../library/help/token";
import VerifyUser from "./../../library/verifyUser";
import localConfig from './../../config'

const moment = require("moment");

const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();

const config = localConfig.routes.sys;

const SSO = localConfig.SSO;


const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);



export const login = async function(ctx,next){
	let result:Result = new Result();
	// let token = verifyUser.getToken(ctx);
	
	let isLogin = await verifyUser.verifyToken(ctx);
    if(isLogin){
       ctx.body={
			"responseCode": 1000
		}
        return;
    }
	return smallLogin(ctx,next);

	// return verifyUser.verifyToken(token).then((info)=>{
	// 	if(SSO===true){
	// 		ctx.body={
	// 			"responseCode": 1000
	// 		}
	// 	}else{
	// 		return smallLogin(ctx,next);
	// 	}
		
	// }).catch(()=>{
	// 	return smallLogin(ctx,next);
	// })


	
};

const smallLogin = function(ctx,next){
	 let searchParam  = ctx.request.body;
	 console.log("?",searchParam);
	 let result:Result = new Result();
	 if(!searchParam.st){
		 result.error(404);
		 ctx.body=result.getValue();
		 return;
	 }
	 

	return fetch.getData("/api/account4Client/login",searchParam,"POST",{},"form-data").then((data:any)=>{

		if(data.responseCode===1000){
			let userId = data.data.userId;
			let token = tokenHelp.build(data.data.userId);
			// verifyUser.saveData(token,userId);
			verifyUser.saveTokenInfo(verifyUser.getTokenKey(ctx),token,{userId},userId)
			verifyUser.setCookie(ctx,"token",token,userId);
			data.data.userId=123321;
			ctx.body=data;
		}else{
			ctx.body=data
		}
		//result.success({});
		
	})
}

