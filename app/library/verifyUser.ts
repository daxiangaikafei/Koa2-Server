import redis from "./help/redis";
import Token from "./help/token";
import Result from "./help/result"; 
import * as moment from "moment";

const result:Result = new Result();
const config:LocalConfig = require("./../config/index");

const IgnoreUrls = config.ignoreUrls;
const format = "YYYY-MM-DD hh:mm:ss:SSS";
const tokenHelp:Token = new Token();

const env     = process.env.NODE_ENV || 'development';

const SSO = config.SSO;
class VerifyUser {
    constructor(){
        this.verify= this.verify.bind(this);
    }
    setCookie(ctx,key,token,dataKey){
        ctx.cookies.set(key,(SSO===true?(token+dataKey):token),config.cookie)//LocalConfig.cookie  {"signed":true}  config.cookie
    }
    //存入 redis token userId now
    saveData(token:string,userId:string){
                let data = {
                    token,
                    userId,
                    date:moment().format(format)
                }
                console.log("保存token",JSON.stringify(data));
                let key = config.redis.tokenKey+":"+(SSO===true?userId:token);
                redis.set(key,JSON.stringify(data));
                redis.expire(key,config.redis.expiration);
                //redis.set(config.redis.tokenKey+":"+userId,JSON.stringify(data));
    }
    saveTokenInfo(tokenKey:string,token:string,tokenInfo:any,dataKey:string){
        let data = Object.assign({},tokenInfo,{
            token,
            date:moment().format(format)
        });
        // console.log("保存token",JSON.stringify(data));
        let key = tokenKey+":"+(SSO===true?dataKey:token);
        redis.set(key,JSON.stringify(data));
        redis.expire(key,config.redis.expiration);
    }
    //从redis获取数据
    getTokenInfo(key:string){
        // console.log("查询"+config.redis.tokenKey+":"+key)
        // return redis.get(config.redis.tokenKey+":"+key);
        return redis.get(key);
    }
    verifyToken(token:string){
        return new Promise((rev,reb)=>{
                if(!token){
                    reb();
                }
                this.getTokenInfo(token).then(result=>{
                        if(result){
                            rev(JSON.parse(result))
                        }else{
                            reb()
                        }
                })
        })
    }
    
    getTokenKey(ctx){
        let key = ctx.originalUrl.split("/")[2]
        let tokenKey = config.routes[key]["tokenKey"]||config.routes["qbii"]["tokenKey"];
        return tokenKey;
    }
    getToken(ctx){
        let token = ctx.cookies.get("token")||(process.env.NODE_ENV==="development"&&ctx.request.headers.token);
        if(!token){
            return undefined
        }
        return this.getTokenKey(ctx)+":"+token;
    }
    verify(ctx,next){
        //查看url是否在 过滤名单里面  .split(",")[1]
        //let token = ctx.cookies.get("token");
        let token  = this.getToken(ctx);
        let {url} = ctx;
        url = url.split("?")[0]
        if(IgnoreUrls[url]){
            return next();
        }
        
        if(token){
            return this.verifyToken(token).then((info:any)=>{
                ctx.state.userInfo = info
                //  ctx.state.config = 
                return next();
            }).catch(()=>{
                result.error(200,"登录过期");
                ctx.body = result.getValue();
                return; 
            })
        }else{
            result.error(200,"未登陆");
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