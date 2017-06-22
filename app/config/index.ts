import * as path from "path";
import redis from '../library/help/redis'

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';

let config:LocalConfig
const configName = "localConfig"

const init = async () =>{
    let data:LocalConfig = await getRedisData()
    if(!data){
        config = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./localConfig.'+env+'.json')).toString())
        redis.set(configName, JSON.stringify(config))
    }else{
        config = data
    }
    console.log("config 数据初始化成功")
    IntervalUpdate(1000*60)
}

const getRedisData = async ()=>{
    let data = await redis.get(configName)
    let result:LocalConfig
    if(data){
        result = JSON.parse(data);
    }
    return result
}

const update = async () =>{
    let result:LocalConfig = await getRedisData()
    return result
}

const IntervalUpdate = (times) => {
    setInterval(async ()=>{
        config = await update()
        console.log("redis 配置文件已更新")
    }, times)
}


/**
 * 添加修改数据
 * @param routerName 
 * @param routerData 
 */
const setRouterData = async (routerName, routerData:RouterConfig) => {
    let result:LocalConfig = await getRedisData()
    if(result){
        result.routes[routerName] = routerData
        config = result
        redis.set(configName, config)
    }
}

export default {
    get config(){
        return config
    }
}
export { init, setRouterData }