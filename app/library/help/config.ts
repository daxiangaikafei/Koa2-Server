///
import RedisData from "./redisData";


// let config:Hee;

let redis = new RedisData("configInfo");




 class Config {
    constructor(){
        
    }
    // private redis;
    async getData(){
        let data:Configt = await redis.getDataAsync();
        return data;
    }
    //Promise<weixinInfot>
    async getWeiXinInfo(key){
        let data= await this.getData();
        return data.weixins[key]||{};
    }
    async saveWeiXinInfo(key,info){
        let result = (await this.getData())||{weixins:{}};
        let temp = (result.weixins&&result.weixins[key]&&result.weixins)||{[key]:{}};
        for(let keys in info){
            temp[key][keys] = info[keys];
        }
        
        let weixins = Object.assign({},result.weixins,temp);
        result.weixins = weixins;
        return redis.saveData(result);
    }

}
export default Config


type Configt = {
    "weixins":weixinst
}
type weixinst = {
    "item":weixinInfot,
}
type weixinInfot = {
    "appid":string,
    "secret":string,
    "token":string,
    "tickteJs":string,
    "timing":{
        "getToken":{
            "time":string
        },
        "tickerJsGet":{
            "time":string
        }
    }
}


// module.exports = 