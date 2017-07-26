import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import Weixin from "./../weixin/interface";
import VerifyUser from "./../../library/verifyUser";
import Token from "./../../library/help/token";
import ConfigHelp from "./../../library/help/config";
import localConfig from "./../../config";
import logger from "./../../library/log/logger";

const config = localConfig.routes.item;

const fetch: Fetch = new Fetch(config.domain, config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);
const tokenHelp: Token = new Token();
const verifyUser: VerifyUser = new VerifyUser(true);

let weixin = new Weixin("item");
/**
 * 微信用户登录
 * @param ctx 
 * @param next 
 */
export const loginx = async function (ctx, next) {
    ctx.cookies.set('name', 'tobi', { signed: true });
    ctx.body={};
    return;
}
export const login = async function (ctx, next) {
    let result: Result = new Result();
    let { code } = ctx.query;
    // console.info()
    let isLogin = await verifyUser.verifyToken(ctx);
    if(isLogin){
        ctx.body = result.success({});
        return;
    }

    let re: any = await weixin.userTokenGet(code);
    // ctx.body = re;
    if (re && re.errcode == undefined) {
        //access_token  refresh_token  openid
        let userInfo = {};
        let resultRefresh: any = await weixin.userTokenRefresh(re.refresh_token);

        //resultRefresh.openid
        let reUserInfo = await verifyUser.getTokenInfoByKey(resultRefresh.openid,ctx);
        if(reUserInfo){
            verifyUser.setCookie(ctx, "token", reUserInfo.token, reUserInfo.openid);
            // verifyUser.setCookie(ctx, "token", reUserInfo.token, reUserInfo.userId);
            ctx.body = result.success({});
            return;
        }
        // let guanzhuUserInfo: any = await weixin.userInfoGetByGuanZhu(resultRefresh.openid);
        let shouquanUserInfo: any = await weixin.userInfoGet(resultRefresh.openid, resultRefresh.access_token);
        // userInfo = guanzhuUserInfo;
        // if(guanzhuUserInfo.errcode==undefined&&guanzhuUserInfo.subscribe===0){
        //     //没有关注
        //     userInfo = shouquanUserInfo;
        //     if(shouquanUserInfo.errcode&&shouquanUserInfo.errcode===48001){
        //         //没有授权
        //         ctx.body = result.error(201,"此用户未关注,也没有授权，需要跳转到授权界面");
        //         return;
        //     }
            
        // };
        userInfo = shouquanUserInfo;
        let jgUserInfo = await sendUserInfo(resultRefresh.openid, resultRefresh.access_token,userInfo);
        // console.log(jgUserInfo, "\n",guanzhuUserInfo);userInfo.openid
        // let jgUserInfo ="xxxxxxxxx";
        if(jgUserInfo&&resultRefresh.openid){
        // if (userInfo.openid && resultRefresh.openid) {
            //    verifyUser.
            let { userId } = { userId: jgUserInfo };
            let token = tokenHelp.build(userId);
            // verifyUser.saveData(token,userId);
            verifyUser.saveTokenInfo(verifyUser.getTokenKey(ctx), token, Object.assign({ openid: resultRefresh.openid, access_token: resultRefresh.access_token }, { userId }), resultRefresh.openid)
            await verifyUser.setCookie(ctx, "token", token, resultRefresh.openid);
            ctx.body = result.success({});
        } else {
            logger.error("用户登录失败","",{
                resultRefresh:resultRefresh,
                userInfo:jgUserInfo
            })
            result.success(userInfo);
            ctx.body = result.error(1, "获取用户信息失败");

        }
        

        // console.log("resultRefresh", resultRefresh)
        // console.log("userInfo", userInfo)
    } else {
        logger.error("根据code获取微信用户token失败","",{re});
        ctx.body = result.error(1, "获取用户信息失败");
    }
};

export 
/**
 * 获取 userid
 * @param openid 微信openid
 */
const sendUserInfo = async (openid, access_token,userInfo) => {
    // let result:Result = new Result();
    ///user/getUserId?openid=ofrn10wNPOGlmHgv3G0ivs9i_KVM
    // let result: any = await fetch.getData("/user/getUserId", { openid, access_token }, "GET");
    //let result: any = await fetch.getData("/user/getUserId", { openid }, "GET");
    let result:any = await fetch.getData("/user/postWxUser",userInfo,"POST")
    if (result && result.responseCode === 1000) {
        return result.data;
    } else {
        return false;
    }
    //{responseCode:0,"data":1234567}
}
export const getWXInfo = async function(ctx,next){
    let info = await weixin.infoGet();
    let result = new Result();
    ctx.body = result.success({
        appid:info.appid
    })
}
/**
 * 获取用户详情
 * @param ctx 
 * @param next 
 */
// export const getUserInfo = async (ctx, next) => {
//     let result = new Result();
//     let { openid, access_token } = ctx.state.userInfo;
//     let info = await sendUserInfo(openid, access_token);
//     if (info) {
//         ctx.body = result.success(info);
//         return;
//     }
//     ctx.body = result.error(1, "呵呵 ");
// }

export const getWeiXinInfo = async () => {
    let data: any = await fetch.getData("/config/wxConfig", {}, "GET");
    if (data && data.responseCode === 1000) {
        let configHelp = new ConfigHelp();
        configHelp.saveWeiXinInfo("item", {
            appid: data.data.appID,
            secret: data.data.appSecret,
            access_token: data.data.accessToken,
            jsapi_ticket: data.data.jsapiTicket,
        })
        return true;
    }else{
        console.log("获取 有好物的微信配置异常...",data)
    }
    return false;

}

export const checkLogin = function (ctx, next) {
    let result: Result = new Result();
    ctx.body = result.success({});
}

// export 