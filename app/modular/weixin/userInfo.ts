

import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";


export async function getToken(code:string,config:any){

    return fetch.getData("https://api.weixin.qq.com/sns/oauth2/access_token",{},"GET").then((data:any)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
}
//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code 