//const path = require('path');

// const koa = require('koa');
// const logger = require('koa-logger');  //日志
// const send = require('koa-send');
// const onError = require('koa-onerror'); //出错处理
// const convert = require('koa-convert');
// const body = require("koa-better-body"); //body 转换为json
// const session = require('koa-session');  //用户session
//const json = require("koa-json"; //get请求 转换为json数据

import * as path       from 'path'
import * as koa        from 'koa'
import * as convert    from 'koa-convert'
import * as logger     from 'koa-logger'
import * as body       from 'koa-better-body'
import * as json       from 'koa-json'
import * as onError    from 'koa-onerror'



//const routers = require("./routes/index");
const config = require("./server.config.json");


import routers from "./routes/index";

//console.log(process);
var app = new koa();
app.use(logger());//日志
app.use(convert(body({
  querystring: require('qs')
})));//表单什么数据转换 
//异常处理
onError(app);

// app.keys = ['im a newer secret', 'i like turtle'];
// app.use(convert(session(config.serverSessionConfig,app)));


/*app.use((ctx, next) => {

  let userKey = ctx.cookies.get("userkey");
  if(!userKey&&!config.ignoreUrls[ctx.url]){
     ctx.body = {
       code:200,
       message:"您还没登录"
     }
     return next();
  }
});*/

/*处理  404   500  页面 */
app.use(async(ctx,next) => {
   await next();
   console.log("status",ctx.status)
   if (404 != ctx.status&& 500 != ctx.status) return; //&& 500 != ctx.status
   switch (ctx.accepts('html', 'json')) {
    case 'html':
      //ctx.type = 'html';
      //ctx.body = artTemplate(ctx.status, ctx);
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.body = {
        
      }
  }
});
// app.use((ctx,next)=>{
//     return next().then((a,b)=>{
//         console.log("a",a)
//     })
// })

//import aname from "sysHelp";

//console.log(aname)

app.use(routers.routes())
   .use(routers.allowedMethods());






app.listen(config.server.port);


