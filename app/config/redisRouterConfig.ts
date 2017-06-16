// import RouterConfig from '../interface/localConfig'
// import Config from '../interface/localConfig'


class RedisRouterConfig {

    private redis : any;
    private configName = "localConfig"

    constructor(redis){
        this.redis = redis;
    }

    /**
     * 初始化redis config
     */
    initConfig(){
        this.redis.get(this.configName).then(result=>{
            if(!result){
                const config:Config = require("./index");
                this.redis.set(this.configName, JSON.stringify(config))
            }
        })
    }

    /**
     * 获取localConfig数据
     */
    public async getData(){
        let str = await this.redis.get(this.configName)
        let result:Config = JSON.parse(str)
        return result
    }

    /**
     * 获取localConfig.router项目数据
     * @param routerName 
     */
    public async getRouterByName(routerName){
        let str = await this.redis.get(this.configName)
        let result:Config = JSON.parse(str)
        let res:RouterConfig = result.routes[routerName]
        return res
    }

    /**
     * 添加修改数据
     * @param routerName 
     * @param routerData 
     */
    public async setRouterData(routerName, routerData:RouterConfig){
        let str = await this.redis.get(this.configName)
        let result:Config = JSON.parse(str)
        result.routes[routerName] = routerData
        this.redis.set(this.configName, JSON.stringify(result))
    }
}

import redis from '../library/help/redis'
let config = new RedisRouterConfig(redis)
export default config