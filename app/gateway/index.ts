import * as LocalConfig from "./../config";

import Result from "./../library/help/result";


import config from "./../config";

let result:Result = new Result();

const GateWay = async function (ctx, next) {
    
    // tianxia  diyi
    let {url} = ctx;
    url = url.split("?")[0];
    // let info  = config.gateway.routers[url];

    // if(!info){
    //     ctx.body = result.error(101);
    // }
    await next();

}

export default function(){
    return GateWay;
};