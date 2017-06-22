
import * as Config from './config'


Config.init().then(()=>{
    let koa2Server = require('./koa2Server')
    console.log("初始化App")
    koa2Server()
})