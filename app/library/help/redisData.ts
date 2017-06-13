import redis from "./redis";
export default class RedisData {
    constructor(key){
        this.key = key;
        this.init();
        
    }
    private async init(){
        this.data = JSON.stringify(await this.dataGetFromRedis()) ;
        return this.data;
    }
    private key:string;
    private data:any;
    private async dataGetFromRedis(){
        // this.data =  await redis.get(this.key);
         return await redis.get(this.key);
    }
    getData(){
        return this.data;
    }
    async saveData(data){
        let _this  = this;
        return redis.set(this.key,JSON.stringify(data)).then((err,data)=>{
            console.log("xxxx",err,data)
            return _this.init();
        });
        // redis.expire(key,config.redis.expiration);
    }
    async getDataAsync(){
        // let result = redis.get(this.key).then((err,reuslt)=>{
        //     console.log("-------")
        //     console.info(err)
        //     console.info(reuslt)
        // })
        let result =JSON.parse(await redis.get(this.key));
        return result;
    }
}
