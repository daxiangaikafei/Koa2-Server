import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import Weixin from "./../weixin/interface";
import VerifyUser from "./../../library/verifyUser";
import Token from "./../../library/help/token";
import ConfigHelp from "./../../library/help/config";

const localConfig:LocalConfig = require("./../../config/index");
const config = localConfig.routes.item;
const fetch: Fetch = new Fetch(config.domain, config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);
const tokenHelp: Token = new Token();
const verifyUser: VerifyUser = new VerifyUser();

let weixin = new Weixin("item");
/**
 * 微信用户登录
 * @param ctx 
 * @param next 
 */
export const login = async function (ctx, next) {
    let result: Result = new Result();
    let { code } = ctx.query;
    // console.info()
    let re: any = await weixin.userTokenGet(code);
    // ctx.body = re;
    if (re && re.errcode == undefined) {
        //access_token  refresh_token  openid
        let resultRefresh: any = await weixin.userTokenRefresh(re.refresh_token);
        let userInfo: any = await weixin.userInfoGet(resultRefresh.openid, resultRefresh.access_token);
        let sbUserInfo = await sendUserInfo(resultRefresh.openid, resultRefresh.access_token);

        console.log(sbUserInfo, "00000000000")
        if(sbUserInfo&&userInfo.openid&&resultRefresh.openid){
        // if (userInfo.openid && resultRefresh.openid) {
            //    verifyUser.
            let { userId } = { userId: sbUserInfo };
            let token = tokenHelp.build(userId);
            // verifyUser.saveData(token,userId);
            verifyUser.saveTokenInfo(verifyUser.getTokenKey(ctx), token, Object.assign({ openid: userInfo.openid, access_token: resultRefresh.access_token }, { userId }), userId)
            verifyUser.setCookie(ctx, "token", token, userId);
            ctx.body = result.success(userInfo);
        } else {
            ctx.body = result.error(1, "获取用户信息失败");

        }

        console.log("resultRefresh", resultRefresh)
        console.log("userInfo", userInfo)
    } else {
        ctx.body = result.error(1, "获取用户信息失败");
    }
};
/**
 * 获取 userid
 * @param openid 微信openid
 */
const sendUserInfo = async (openid, access_token) => {
    // let result:Result = new Result();
    ///user/getUserId?openid=ofrn10wNPOGlmHgv3G0ivs9i_KVM
    // let result: any = await fetch.getData("/user/getUserId", { openid, access_token }, "GET");
    let result: any = await fetch.getData("/user/getUserId", { openid }, "GET");
    if (result && result.responseCode === 1000) {
        return result.data;
    } else {
        return false;
    }
    //{responseCode:0,"data":1234567}
}
/**
 * 获取用户详情
 * @param ctx 
 * @param next 
 */
export const getUserInfo = async (ctx, next) => {
    let result = new Result();
    let { openid, access_token } = ctx.state.userInfo;
    let info = await sendUserInfo(openid, access_token);
    if (info) {
        ctx.body = result.success(info);
        return;
    }
    ctx.body = result.error(1, "呵呵 ");
}

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
    }
    return false;

}

export const checkLogin = function (ctx, next) {
    let result: Result = new Result();
    ctx.body = result.success({});
}

// export 