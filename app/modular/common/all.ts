import Result from "./../../library/help/result";

import logger from "./../../library/log/logger"
import localConfig from "./../../config"
import * as Router from "koa-router";
import {isArray} from "lodash";
import All from "./../../library/help/all";

import Error from "./../../library/help/error";
const error = new Error("common/all")

const configRoutes = localConfig.routes;


const creatRoutersByConfig = (baseConfig)=>{
    let router:Router = new Router(),
        {routes,prefix,domain,timeout,rightTemplate} = baseConfig;
        router.prefix(prefix);
    for(var key in routes){
        let {method} = routes[key];
        console.log(".......",domain+key);
        method = method||"all";
        let all = getTodoMethod.createFetch(prefix,domain,timeout,routes,rightTemplate);

        router[method.toLocaleLowerCase()](key,all);
    }
    return router
}

const TodoMethod = () => {
    let methods = {};
    return {
        createFetch: (prefix, domain, timeout,routes, rightTemplate = {
            "code": {
                "key":"responseCode",
                "value":1000
            },
            "result": {
                "key":"data"
            },
            "message": {
                "key":"message"
            }
        }) => {
            if (methods[domain]) {
                return methods[domain];
            } else {
                let all = new All(prefix, domain, timeout,routes);
                let {code,result,message} = rightTemplate;
                methods[domain] = function(ctx,next){
                    let backResult = new Result;

                    return all.normal(ctx,next).then((data)=>{
                        if(data&&data[code["key"]]&&data[code["key"]]===code["value"]){
                            ctx.body = backResult.success(data[result['key']])
                        }else{
                            ctx.body = backResult.error(data[code['key']],data[message['key']])
                        }
                    }).catch((err)=>{
                        error.set(1,err.message);
                        ctx.body = backResult.setError(error);
                    })
                };
                return methods[domain]
            }
        }
    }
}
const getTodoMethod = TodoMethod();

let init = function(){
    let allRoutes = [];
    for(var key in configRoutes){
        let {routes} = configRoutes[key];
        if(isArray(routes)){
            routes.forEach((config)=>{
                allRoutes.push(creatRoutersByConfig(Object.assign({},configRoutes[key],config)))
            })
        }else{
            allRoutes.push(creatRoutersByConfig(configRoutes[key]))
        }
    }
    return allRoutes;
}


export default init()