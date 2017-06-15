
import Sign from "./../../library/help/weixin/sign";
import ConfigHelp from "./../../library/help/config";
import Result from "./../../library/help/result";
import verifyEntity from "./../../library/help/verifyEntity";
import Secret from  "./../../library/help/secret";

import Winxin from "./interface";
import * as _ from "lodash";

let configHelp = new ConfigHelp();
let secret = new Secret();

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

const key = "天下第一!!!!";

const encrypt = function(param:any){
    let newParams = Object.assign({},param);
    delete newParams.secret_node;
    let content = JSON.stringify(newParams);
    let encryptcontent = secret.encryptMd5Normal(content,key);
    return encryptcontent===param.secret_node?true:false;
}
// encrypt(
//         {"access_token":"1234","appid":"1234","jsapi_ticket":"1234","secret":"1234","time":"2017-07-09 12:19:20"}
//     )



export const setConfig = async(ctx,next)=>{
    // 
    let result:Result = new Result();
    let param = ctx.request.body;
    let params = ctx.params;
    // encrypt({
    //     appid:"1234",
    //     secret:"1234",
    //     access_token:"1234",
    //     jsapi_ticket:"1234",
    //     time:"2017-07-09 12:19:20",
    //     secret_node:"ssssss"
    // });
    
    
    // let verify = verifyEntity(param,{
    //     appid:"",secret:"",access_token:"",jsapi_ticket:"",time:"",secret_node:""
    // });
    let verify = verifyEntity(param,{
        access_token:"",appid:"",jsapi_ticket:"",secret:"",time:"",secret_node:""
    });
    let weixin = new Winxin(params.channel);
    let userInfo = await weixin.ticketJsGet();
        console.log(userInfo)
    
    if(_.isObject(verify)&&params.channel){
        //加密计算
        let enReuslt = encrypt(verify);
        if(enReuslt!==true){
            ctx.body = result.error(1,"呵呵，你加密错了！");
            return false;
        }
        let weixin = new Winxin(params.channel);
        
        let isRight = await weixin.verify(verify["access_token"]);
        if(isRight){
            let weixinInfo = await configHelp.getWeiXinInfo(params.channel)||{};
            configHelp.saveWeiXinInfo(params.channel,Object.assign(weixinInfo,verify));
            ctx.body = result.success({});
        }else{
            ctx.body = result.error(1,"呵呵！你配置错了");
        }
        
    }else{
        ctx.body = result.error(1,verify.toString());
    }
    // if(params.channel&&param.)
}