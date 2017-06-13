
import Sign from "./../../library/help/weixin/sign";
import ConfigHelp from "./../../library/help/config";
import Result from "./../../library/help/result";
import verifyEntity from "./../../library/help/verifyEntity"

import * as _ from "lodash";

let configHelp = new ConfigHelp();
/**
 * 生成微信配置信息
 */
const buildConfig = (key,info={appid:"",secre:"",access_token:"",jsTicket:""})=>{
     configHelp.saveWeiXinInfo(key,info);
}
/**
 * jsticker加密
 */
export const buildJsTicket = async (ctx,next)=>{
    // return 
}



export const setConfig = async(ctx,next)=>{
    // 
    let result:Result = new Result();
    let param = ctx.request.body;
    let params = ctx.params;
    
    let verify = verifyEntity(param,{
        appid:"",secret:"",access_token:"",jsapi_ticket:""
    });
    if(_.isObject(verify)&&params.channel){
        let weixinInfo = await configHelp.getWeiXinInfo(params.channel)||{};
        configHelp.saveWeiXinInfo(params.channel,Object.assign(weixinInfo,verify));
        ctx.body = result.success({});
    }else{
        ctx.body = result.error(1,verify.toString());
    }
    // if(params.channel&&param.)
}