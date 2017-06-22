
// import RouterConfig from '../interface/localConfig'
// import Config from '../interface/localConfig'


class RedisRouterConfig {


    private redis : any;x
    private configName = "localConfig"

    constructor(redis){
        this.redis = redis;
    }

    /**
     * 初始化redis config
     */
    initConfig = async () =>{
        
    }

    /**
     * 获取localConfig数据
     */
    public getData = async () => {
        let data = await this.redis.get(this.configName)
        let result:LocalConfig = JSON.parse(data)
        return result
    }

    /**
     * 获取localConfig.router项目数据
     * @param routerName 
     */
    public async getRouterByName(routerName){
        let str = await this.redis.get(this.configName)
        let result:LocalConfig = JSON.parse(str)
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
        let result:LocalConfig = JSON.parse(str)
        result.routes[routerName] = routerData
        this.redis.set(this.configName, JSON.stringify(result))
    }
}

import redis from '../library/help/redis'
let config = new RedisRouterConfig(redis)
config.initConfig()
export default config