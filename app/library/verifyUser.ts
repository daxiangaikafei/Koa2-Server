import redis from "./help/redis";
import Token from "./help/token";
import Result from "./help/result"; 
import * as moment from "moment";
import localConfig from './../config';
import logger from "./log/logger";

const result:Result = new Result();
const config:LocalConfig = localConfig

const IgnoreUrls = config.ignoreUrls;
const format = "YYYY-MM-DD hh:mm:ss:SSS";
const tokenHelp:Token = new Token();

const env     = process.env.NODE_ENV || 'development';

const SSO = config.SSO;
class VerifyUser {
    constructor(sso=SSO){
        this.verify= this.verify.bind(this);
        
        this.setCookie = this.setCookie.bind(this);
        this.saveTokenInfo = this.saveTokenInfo.bind(this);
        this.SSO = sso;
    }
    private SSO;
    async setCookie(ctx,key,token,dataKey){
        ctx.cookies.set(key,(this.SSO===true?(dataKey):token),config.cookie)//LocalConfig.cookie  {"signed":true}  config.cookie
    }
    //存入 redis token userId now
//    saveData(token:string,userId:string){
//                 let data = {
//                     token,
//                     userId,
//                     date:moment().format(format)
//                 }
//                 console.log("保存token",JSON.stringify(data));
//                 let key = config.redis.tokenKey+":"+(this.SSO===true?userId:token);
//                  redis.set(key,JSON.stringify(data));
//                 redis.expire(key,config.redis.expiration);
//                 //redis.set(config.redis.tokenKey+":"+userId,JSON.stringify(data));
//     }
    saveTokenInfo(tokenKey:string,token:string,tokenInfo:any,dataKey:string){
        let data = Object.assign({},tokenInfo,{
            token,
            date:moment().format(format)
        });
        // console.log("保存token",JSON.stringify(data));
        let key = tokenKey+":"+(this.SSO===true?dataKey:token);
        redis.set(key,JSON.stringify(data));
        // .exex(function(err){
        //     logger.error("登录信息保存到redis,","",JSON.stringify(err))
        // });
        redis.expire(key,config.redis.expiration);
    }
    //从redis获取数据
    private getTokenInfo(key:string){
        // console.log("查询"+config.redis.tokenKey+":"+key)
        // return redis.get(config.redis.tokenKey+":"+key);
        return redis.get(key);
    }
    async _verifyToken(token:string){
        // return new Promise((rev,reb)=>{
        //         if(!token){
        //             reb();
        //         }
        //         this.getTokenInfo(token).then(result=>{
        //                 if(result){
        //                     rev(JSON.parse(result))
        //                 }else{
        //                     reb()
        //                 }
        //         })
        // })
        let result = await this.getTokenInfo(token);
        return (result&&JSON.parse(result))||result
    }
    //根据key  获取用户信息
   async getTokenInfoByKey(key,ctx){
       let info = await this.getTokenInfo(this.getTokenKey(ctx)+":"+key);
    //    console.log("用户信息Wie",info);
       return JSON.parse(info)||false;
    }
    getTokenKey(ctx){
        let key = ctx.originalUrl.split("/")[2]
        let tokenKey = (config.routes[key]&&config.routes[key]["tokenKey"])||config.routes["qbii"]["tokenKey"];
        return tokenKey;
    }
    getToken(ctx){
        let token = ctx.cookies.get("token")||(process.env.NODE_ENV==="development"&&ctx.request.headers.token);
        if(!token){
            return undefined
        }
        return this.getTokenKey(ctx)+":"+token;
    }
    async verifyToken(ctx){
        let token  = this.getToken(ctx);
        let info = await this._verifyToken(token);
        if(info){
           return true;
        }else{
           return false; 
        } 
    }
    async verify(ctx,next){
        //查看url是否在 过滤名单里面  .split(",")[1]
        //let token = ctx.cookies.get("token");
        let token  = this.getToken(ctx);
        let {url} = ctx;
        url = url.split("?")[0];
        // let urlInfo = config.gateway.routes[url] || undefined;

        // if(urlInfo&&urlInfo.isLogin===false){
        //     return next();
        // }
        if(IgnoreUrls[url]){
            return next();
        }
        
        if(token){
            let info = await this._verifyToken(token);
            if(info){
                ctx.state.userInfo = info;
                return next();
            }else{
                result.error(200,"登录过期");
                    ctx.body = result.getValue();
                    logger.error("匹配失败","",{
                        cookie:ctx.cookies.get("token")
                    })
                    return; 
            }
        }else{
            result.error(200,"未登陆");
            logger.error("未登录信息","",{
                cookie:ctx.cookies.get("token")
            })
            ctx.body = result.getValue();
            return;
        }
        
    }
    
}

export default VerifyUser;
/**
 * switch (token) {
            case undefined:
                result.error(200,"未登陆");
                ctx.body = result.getValue();
                return;
            case "1":
                result.error(200,"未登陆");
                ctx.body = result.getValue();
                return;


        }
 */