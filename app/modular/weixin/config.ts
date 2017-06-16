///
import RedisData from "./../../library/help/redisData";


// let config:Hee;

let redis = new RedisData("weixinConfig");




 class Config {
    constructor(){
        
    }
    // private redis;
    private async getData(){
        let data = await redis.getDataAsync();
        return data;
    }
    //Promise<weixinInfot>
    async getWeiXinInfo(key){
        let data= await this.getData();
        return data.weixins[key]||{};
    }
    async saveWeiXinInfo(key,info){
        let result = (await this.getData())||{};
        let temp = (result&&result[key]&&result)||{[key]:{}};
        for(let keys in info){
            temp[key][keys] = info[keys];
        }
        
        let weixins = Object.assign({},result.weixins,temp);
        result.weixins = weixins;
        return redis.saveData(result);
    }

}
export default Config