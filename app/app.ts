import * as path       from 'path'
import * as koa        from 'koa'
// import * as convert    from 'koa-convert'
import * as logger     from 'koa-logger'
// import * as body       from 'koa-better-body'
// import * as onError    from 'koa-onerror'

import * as body from "koa-bodyparser";

let config:Sysconfig = require("./../config/index");

//import * as config from "./../config/index";

import {each} from "lodash";

import Result from "./library/help/result";
//import routers from "./routes/index";
import * as Router from "koa-router";
let routers:Router[] = require("./routes/index");

import * as a  from "./../config/index";
console.log(a);
let result:Result = new Result();


//console.log(process);
let app:koa = new koa();
app.use(logger());//日志
app.use(body({
  // querystring: require('qs')
}));//表单什么数据转换 
//异常处理
// onError(app);



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
   result.error(ctx.status,"");
   ctx.body=result.getValue();
});

// app.use((ctx,next)=>{
//     return next().then((a,b)=>{
//         console.log("a",a)
//     })
// })
each(routers,function(router,index){
  app.use(router.routes())
  app.use(router.allowedMethods());
})


// console.log(config.localServer.port);

// app.listen(config.localServer.port);


//let value:any=config
app.listen(config.localServer);

