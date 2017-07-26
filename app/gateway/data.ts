///
import RedisData from "./../library/help/redisData";


// let config:Hee;

let redis = new RedisData("gatewayConfig");




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
}
export default Config