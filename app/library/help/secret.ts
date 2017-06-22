import * as crypto from "crypto";
import * as moment from "moment";
const key = "密码加密啦，呵呵哒，ll|~";


export default class Secret {
    constructor(){

    }
    encrypt(password :String,hasTime=false){
        let content =  password+(hasTime===true?moment().format("YYYY-MM-DD hh:mm:ss:SSS"):"");
        let hash = crypto
            .createHmac('md5',key)
            .update(content)
            .digest('hex');
        return hash;
    }
    encryptMd5Normal(content:string,key:string){
        console.log("加密内容:"+content);
        console.log("加密key:"+key);
        let hash = crypto
            .createHmac('md5',key)
            .update(content,"utf8")
            .digest('hex');
            // console.dir(hash)
        console.log("加密成啥样:"+hash)
        return hash;
    }
}