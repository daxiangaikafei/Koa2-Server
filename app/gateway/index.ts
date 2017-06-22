import * as LocalConfig from "./../config";

import Result from "./../library/help/result";


const GateWay = async function (ctx, next) {
    
    // tianxia  diyi
    let {url} = ctx;
    url = url.split("?")[0];
    let info  = LocalConfig.gateway.routers[url];

    if(!info){

    }else{
        ctx.body
    }
    await next();

}

export default GateWay;