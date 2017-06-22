import * as path from 'path';

import {each} from "lodash";
import * as koa from 'koa';
import * as Router from "koa-router";
import * as body from "koa-bodyparser";

import Result from "./library/help/result";
import VerifyUser from "./library/verifyUser";
import RequestLogger from "./library/log/request";
import logger from "./library/log/logger"
//import aa from "./library/help/mysql";
import auxiliary from "./auxiliary";

//aa;
//import * as onError    from 'koa-onerror'npm
console.log(RequestLogger)

let koa2Server = ()=>{
    const env = process.env.NODE_ENV || 'development';
    const config : Sysconfig = require("./../config/index");
    const routers : Router[] = require("./routes/index");
    const convert = require('koa-convert')

    let result : Result = new Result();
    let verifyUser : VerifyUser = new VerifyUser();
    let app : koa = new koa();

    app.keys = ['im a newer secret', '你说是啥 就是啥，呵呵哒'];


    // app.use(RequestLogger)

    app.use(convert(body({
        onerror: function (err, ctx) {
            ctx.throw('body parse error', 422);
        }
        // querystring: require('qs')
    }))); //表单什么数据转换

    // 异常处理
    app.context.onerror = function (err) {
        if (err == null) {
            return;
        }
        result.error(500, "");
        this.res.end(JSON.stringify(result.getValue()));
    }

    /*处理  404   500  页面 */
    app.use((ctx, next) => {
        return next().then(() => {
            if (ctx.status !== 200) {
                result.error(ctx.status, "");
                ctx.body = result.getValue();
                logger.error("normal", "", ctx.status);
            } else {
                return;
            }
        }).catch(error => {
            console.error(error)
            result.error(1000, "超时");
            ctx.body = result.getValue();
            logger.error("error", "", error);
        });
    })

    app.on('error', err => logger.error('server error', err));
    //用户校验
    app.use(verifyUser.verify);

    each(routers, function (router, index) {
        app.use(router.routes())
        app.use(router.allowedMethods());
    })

    console.log(config.localServer.port)

    app.listen(config.localServer.port);

    auxiliary();
}

module.exports = koa2Server