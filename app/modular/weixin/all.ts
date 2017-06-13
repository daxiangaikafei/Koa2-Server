interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
    weixins:any;
}

import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import {template} from "lodash";

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.weixin;

const WeixinConfig  = LocalConfig.weixins;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);



//const result:Result = new Result();


export  const all  = async function(url,param){
	// let result:Result = new Result();
    url = url.replace(config.prefix,"");
    let urlConfig  = config.routes[url];
    
	let urlFetch = urlConfig["url"];

    let result  = await fetch.getData(urlFetch,param,urlConfig.method).catch((err)=>{
            return {"errcode":111111,"errmsg":"自定义错误，访问失败!"+JSON.stringify(err)}
    });

    console.log("访问微信结果为",result);
    return result;

}

