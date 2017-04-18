
import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import {template} from "lodash";

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

//const result:Result = new Result();


export const all  = function(ctx,next){
	let result:Result = new Result();
	let {method,header} =  ctx.request;
	let url = ctx._matchedRoute;
	let {userId} = ctx;
    let param= (method==="GET"?(ctx.request.query):(ctx.request.body || ctx.request.fields))||{};
	let params = ctx.params||{};
    url = url.replace(config.prefix,"");
   
	let urlFetch = config.routes[url]["url"];
    var compiled = template(urlFetch);
    urlFetch = compiled(Object.assign({},{userId},param,params));
	console.log("urlFetch:"+urlFetch)
	if(urlFetch){
		return fetch.getData(urlFetch,param,method).then((data:any)=>{
			console.log("url:"+urlFetch)
			// console.log("param:"+param)
			if(data&&data.returnCode===0){
				result.success(data.data);
				ctx.body=result.getValue();
			}else{
				result.error(500);
				ctx.body=result.getValue();
			}
			
		})
	}else{
		result.error(404);
		ctx.body=result.getValue();
	}
    
	
}

