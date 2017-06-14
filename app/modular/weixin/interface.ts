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
import ConfigHelp from "./../../library/help/config";
import {all} from "./all";

let configHelp = new ConfigHelp();
class Weixin {
    constructor(key){
        // this.config = WeixinConfigs[key]; 
        // console.log("llllll",WeixinConfigs,key)
        this.key = key;
    }
    private config;
    private key;
    private async getParams(params,others){
        let result ={};
        let {key} = this;
        let weixinInfo = await configHelp.getWeiXinInfo(key);
        params.map((value)=>{
            result[value] = weixinInfo[value]
        })
        return Object.assign({},result,others);
    }
    async userTokenGet(code:string){
         return  all("/api/weixin/user/token",await this.getParams(["appid","secret"],{code,grant_type:"authorization_code"}));
    }
    async userTokenRefresh(refresh_token:string){
         return  all("/api/weixin/user/tokenRefresh",await this.getParams(["appid"],{refresh_token,grant_type:"refresh_token"}));
    }
    async userInfoGet(openid:string,access_token:string){
         return  all("/api/weixin/user/info",await this.getParams([],{openid,access_token,lang:"zh_CN"}));
    }
    async userInfoGetByGuanZhu(openid:string){
         return  all("/api/weixin/user/info/guanzhu",await this.getParams(["access_token"],{openid,lang:"zh_CN"}));
    }
    async configTokenGet(){
         return  all("/api/weixin/config/token",await this.getParams(["appid","secret"],{grant_type:"client_credential"}));
    }
    async ticketJsGet(){
         return  all("/api/weixin/config/jsTicket",await this.getParams(["access_token"],{type:"jsapi"}));
    }
    async menuGet(access_token){
         return  all("/api/weixin/menu/get",await this.getParams([],{access_token}));
    }
    async verify(access_token){
         let result:any = await this.menuGet(access_token);
         return result.errcode==undefined?true:false;
    }
}

export default Weixin;