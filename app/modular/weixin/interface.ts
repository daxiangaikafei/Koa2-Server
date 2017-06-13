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
const WeixinConfigs = LocalConfig.weixins;


import {all} from "./all";


class Weixin {
    constructor(key){
        this.config = WeixinConfigs[key]; 
        console.log("llllll",WeixinConfigs,key)
    }
    private config;
    
    private getParams(params,others){
        let result ={};
        let {config} = this;
        params.map((value)=>{
            result[value] = config[value]
        })
        return Object.assign({},result,others);
    }
    async userTokenGet(code:string){
         return  all("/api/weixin/user/token",this.getParams(["appid","secret"],{code,grant_type:"authorization_code"}));
    }
    async userTokenRefresh(refresh_token:string){
         return  all("/api/weixin/user/tokenRefresh",this.getParams(["appid"],{refresh_token,grant_type:"refresh_token"}));
    }
    async userInfoGet(openid:string,access_token:string){
         return  all("/api/weixin/user/info",this.getParams([""],{openid,access_token,lang:"zh_CN"}));
    }
    async configTokenGet(){
         return  all("/api/weixin/config/token",this.getParams(["appid","secret"],{grant_type:"client_credential"}));
    }
     async ticketJsGet(access_token){
         return  all("/api/weixin/config/jsTicket",this.getParams([""],{access_token,type:"jsapi"}));
    }
}

export default Weixin;