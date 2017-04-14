import      *          as   path       from 'path';
import      {each}     from "lodash";
import      *          as   koa        from 'koa';
import      *          as   logger     from 'koa-logger';
import      *          as   Router     from "koa-router";
import      *          as   body       from "koa-bodyparser";

import      CSRF       from "koa-csrf";

import      Result     from "./library/help/result";
import      VerifyUser from "./library/verifyUser";

//import * as body from 'koa-better-body'
//import * as onError    from 'koa-onerror'

const env     = process.env.NODE_ENV || 'development';

let config    : Sysconfig  = require("./../config/index");
let routers   : Router[]   = require("./routes/index");
let result    : Result     = new Result();

let verifyUser: VerifyUser = new VerifyUser();

let app       : koa        = new koa();
app.keys      = ['im a newer secret', '你说是啥 就是啥，呵呵哒'];

app.use(logger());//日志
app.use(body({
   //querystring: require('qs')
}));//表单什么数据转换 

app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
})); //csrf公鸡


//异常处理
app.context.onerror = function(err) {
    if (err  ==  null) {
      return;
    }
    if(env === "development"){
      console.log(err);
    }
   result.error(500,"");
   this.res.end(JSON.stringify(result.getValue()));
   return;
}
app.use(verifyUser.verify);
/*处理  404   500  页面 */
app.use((ctx,next)=>{
    return next().then(()=>{
        if (404 != ctx.status&& 500 != ctx.status) return; 
        result.error(ctx.status,"");
        ctx.body=result.getValue();
    }).catch(error=>{
        console.error(error)
        result.error(1000,"超时");
        ctx.body=result.getValue();
    });
})

each(routers,function(router,index){
  app.use(router.routes())
  app.use(router.allowedMethods());
})

app.listen(config.localServer.port);


