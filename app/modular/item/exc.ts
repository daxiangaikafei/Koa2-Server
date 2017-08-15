import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import localConfig from "./../../config";
import logger from "./../../library/log/logger";

const config = localConfig.routes.item.routes[2];

const fetch: Fetch = new Fetch(config.domain, config.timeout);

console.log("domai",JSON.stringify(config))

export const wxUpImage = async (ctx,next) => {
    let result = new Result();
    let params = ctx.request.body;

    params["prefix"] = ctx.state.userInfo.userId;
    let data: any = await fetch.getData("/wx/qiniu/upload", params, "POST");
    if (data && data.responseCode === 1000) {
        ctx.body = result.success(data.data);
    }else{
       ctx.body = result.error(1,data.message||"错误，请稍后的重试！");
    }
    return false;

}