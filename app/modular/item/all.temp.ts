import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";
import logger from "./../../library/log/logger"
import localConfig from "./../../config"
import {template} from "lodash";

const config = localConfig.routes.item;
const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

//const result:Result = new Result();


// class All{
// 	constructor(){

// 	}
// }

export const all  = function(ctx,next){
	let result:Result = new Result();
	let {method,header} =  ctx.request;
	let url = ctx._matchedRoute;
	let { userId } = ctx.state.userInfo ||{userId:""};
    let param= (method==="GET"?(ctx.request.query):(ctx.request.body || ctx.request.fields))||{};
	let params = ctx.params||{};
    url = url.replace(config.prefix,"");
   
	let urlFetch = config.routes[url]["url"];
    var compiled = template(urlFetch);
    urlFetch = compiled(Object.assign({},{userId},param,params));
	// console.log("urlFetch:"+urlFetch)
	console.log("url:"+urlFetch)
	if(urlFetch){
		return fetch.getData(urlFetch,param,method).then((data:any)=>{
			if(data&&data.responseCode===1000){
				result.success(data.data);
				ctx.body=result.getValue();
			}else if(!data){
				result.error(500);
				ctx.body=result.getValue();
			}else{
				result.error(data.responseCode, data.message);
				ctx.body=result.getValue();
			}
		}).catch((error)=>{
			console.log(error)
		})
	}else{
		result.error(404);
		ctx.body=result.getValue();
	}
}

