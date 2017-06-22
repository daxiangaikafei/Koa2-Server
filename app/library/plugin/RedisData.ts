import redis from '../help/redis'

class RedisData {
    private redis : any;
    private configName = "localConfig"
    private _redisLocalConfig:LocalConfig

    constructor(redis){
        this.redis = redis;
    }

    public get RedisLocalData():LocalConfig{
        return this._redisLocalConfig
    }

    public init = async () => {
        let data:LocalConfig = await this.getData()
        if(!data){
            let config:LocalConfig = require("./index");
            this.redis.set(this.configName, JSON.stringify(config))
            this._redisLocalConfig = config
        }else{
            this._redisLocalConfig = data
        }
    }

    /**
     * 获取localConfig数据
     */
    private getData = async () => {
        let data = await this.redis.get(this.configName)
        let result: LocalConfig
        if(data){
            result = JSON.parse(data)
        }
        return result
    }

    /**
     * 添加修改数据
     * @param routerName 
     * @param routerData 
     */
    public async setRouterData(routerName, routerData:RouterConfig){
        let result:LocalConfig = await this.getData()
        if(result){
            result.routes[routerName] = routerData
            this.redis.set(this.configName, JSON.stringify(result))
        }
    }

    private update = async () =>{
        let result:LocalConfig = await this.getData()
        return result
    }

    public async IntervalUpdate(times){
        setInterval(async ()=>{
            this._redisLocalConfig = await this.update()
            console.log("redis 配置文件已更新")
        }, times)
    }
}

const r = new RedisData(redis)
r.IntervalUpdate(1000 * 60);
export default r