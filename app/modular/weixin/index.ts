interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
    weixins:any;
}

const LocalConfig:Config = require("./../../config/index");
const WeixinConfigs = LocalConfig.routes.weixin;


import {all} from "./all";


class Weixin {
    constructor(key){
        this.config = WeixinConfigs[key];
    }
    private config;
    async getUserToken(code:string){
         await all("/api/weixin/user/token",this.getParams(["appId","secret"],{code,grant_type:"authorization_code"}));
    }
    private getParams(params,others){
        let result ={};
        let {config} = this;
        params.map((value)=>{
            result[value] = config[value]
        })
        return Object.assign({},result,others);
    }
}