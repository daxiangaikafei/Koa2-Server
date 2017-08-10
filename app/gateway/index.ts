import * as LocalConfig from "./../config";

import Result from "./../library/help/result";

import config from "./../config";

let result : Result = new Result();

const getToken = function (ctx) {
    return ctx
        .cookies
        .get("token") || (process.env.NODE_ENV === "development" && ctx.request.headers.token);
}

const GateWay = async function (ctx, next) {

    // tianxia  diyi;
    let {url} = ctx;
    url = url.split("?")[0];

    let info = config.gateway.routes[url] || undefined;
    //强制拦截  禁止接口
    if (info && info.isGreatWall === true) {
        ctx.body = result.error(101);
        return

    }
    //强制拦截 no token链接
    if ((info === undefined || info.isLogin !== false) && getToken(ctx) == undefined) {
        ctx.body = result.error(200);
        return
    }
    await next();

}

export default function () {
    return GateWay;
};