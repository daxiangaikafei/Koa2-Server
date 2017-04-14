
import redis from "./help/redis";
import Token from "./help/token";
import Result from "./help/result"; 
import * as moment from "moment";

const result:Result = new Result();
const config:Config = require("./../config/index");

const IgnoreUrls = config.ignoreUrls;
const format = "YYYY-MM-DD hh:mm:ss:SSS";
const tokenHelp:Token = new Token();
class VerifyUser {
    constructor(){
        this.verify= this.verify.bind(this);
    }
    setCookie(ctx,key,value){
        ctx.cookies.set(key,value,config.cookie)//LocalConfig.cookie  {"signed":true}
    }
    getCookie(ctx){
        	
    }
    //存入 redis token userId now
    saveData(token:string,userId:string){
                let data = {
                    token,
                    userId,
                    date:moment().format(format)
                }
                console.log("保存token",JSON.stringify(data))
                redis.set(config.redis.tokenKey+":"+userId,JSON.stringify(data));
       
    }
    getData(userId:string){
        console.log("查询"+config.redis.tokenKey+":"+userId)
       return redis.get(config.redis.tokenKey+":"+userId);
    }
    //判断是否有大登录的ST  是够有token  和token是否失效
    verifyToken(token:string){
        if(!token){
            return new Promise((rev,reb)=>{
                reb();
            })
        }
        let params = token.split(",");
        return this.getData(params[1]).then(result=>{
                return JSON.parse(result);
        })
    }
    next(next:any){
        return next.then(()=>{

        })
    }
    getToken(ctx){
        let token = ctx.cookies.get("token");

        if(!token&&process.env.NODE_ENV==="development"){
            return ctx.request.headers.token||undefined;
        }
        return token;
    }
    verify(ctx,next){
        //查看url是否在 过滤名单里面  .split(",")[1]
        //let token = ctx.cookies.get("token");
        let token  = this.getToken(ctx);
        let {url} = ctx;
        if(IgnoreUrls[url]){
            return next();
        }
        if(token){
            //console.log("token",token);
            return this.verifyToken(token).then((info)=>{
                console.log("info"+":"+info);
                ctx.userId  = info.userId;
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