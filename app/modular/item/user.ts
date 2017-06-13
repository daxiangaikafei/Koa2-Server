import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import Config from '../../interface/LocalConfig'
import Weixin from "./../weixin/interface";
import VerifyUser from "./../../library/verifyUser";
import Token from "./../../library/help/token";

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.item;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);
const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();

let weixin = new Weixin("item");
export const login = async function(ctx,next){
	
	let result:Result = new Result();
	let {code} = ctx.query;
	let re:any  = await weixin.userTokenGet(code);
    ctx.body = re;

    if(re&&re.errcode==undefined){
        //access_token  refresh_token  openid
       let resultRefresh:any = await weixin.userTokenRefresh(re.refresh_token);
       let userInfo:any  = await  weixin.userInfoGet(resultRefresh.openid,resultRefresh.access_token);
        console.log("resultRefresh",resultRefresh)
        console.log("userInfo",userInfo)
    }
   
  
    // let userId = data.data.userId;
    // let token = tokenHelp.build(data.data.userId);
    // // verifyUser.saveData(token,userId);
    // verifyUser.saveTokenInfo(verifyUser.getTokenKey(ctx),token,{userId},userId)
    // verifyUser.setCookie(ctx,"token",token,userId);
};

export const checkLogin = function(ctx, next){
	let result:Result = new Result();
	result.success({});
	ctx.body=result.getValue();
}