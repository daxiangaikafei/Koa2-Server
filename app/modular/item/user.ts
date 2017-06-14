interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}


import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import Weixin from "./../weixin/interface";
import VerifyUser from "./../../library/verifyUser";
import Token from "./../../library/help/token";
import ConfigHelp from "./../../library/help/config";



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
       let userId = await sendUserInfo(userInfo.openid);

       if(userId&&userInfo.openid&&resultRefresh.openid)

        console.log("resultRefresh",resultRefresh)
        console.log("userInfo",userInfo)
    }
};
const sendUserInfo = async (openid)=>{
    // let result:Result = new Result();
    ///user/getUserId?openid=ofrn10wNPOGlmHgv3G0ivs9i_KVM
	let result:any = fetch.getData("/user/getUserId",{openid},"GET");
    if(result&&result.responseCode===1000){
        return result.data;
    }else{
        return false;
    }
    //{responseCode:0,"data":1234567}
}

export const getWeiXinInfo = async ()=>{

    let data:any = await fetch.getData("/config/wqTokenConfig",{},"GET");
    if(data&&data.responseCode === 1000){
        let configHelp = new ConfigHelp();
        configHelp.saveWeiXinInfo("item",{
            appid:data.data.appId,
            secret:data.data.appSecret,
            access_token:data.data.accessToken,
            jsapi_ticket:data.data.jsapiTicket,
        })
        return true;
    }
    return false;
    
}

