/**
 * 通用转发服务帮助
 */
import {template} from "lodash";
import Fetch from "./fetch"
import Error from "./error";

const error = new Error("library/help/all");

class All {
    constructor(prefix,domain,timeout=5000,routes){
        this.config={
            "prefix":prefix,
            "domain":domain,
            "timeout":timeout,
            "routes":routes
        }
        this.fetch = new Fetch(domain,timeout);
    }
    private fetch:Fetch
    private config:any
    // async normal(){
    //     return this._normal;
    // }
    async normal(ctx,next){
        let {method,header} =  ctx.request, 
            url = ctx._matchedRoute,
            {userId} = ctx.state.userInfo||{userId:""},
            params = ctx.params||{},
            param= (method==="GET"?(ctx.request.query):(ctx.request.body || ctx.request.fields))||{};

         
        url = url.replace(this.config.prefix,"");
        let  urlFetch = this.config.routes[url]["url"],
            compiled = template(urlFetch);
            
        urlFetch = compiled(Object.assign({},{userId},param,params));
        console.log("url:"+urlFetch)
        console.dir(param)
        if(urlFetch){
            return this.fetch.getData(urlFetch,param,method)
        }else{
            throw error.set(404,"不见了呢");
        }
    }
}

export default All;