import Router from "koa-router";
import Result from "./../../library/help/Result";
import {routes} from "./../../config/index.json";


const config = routes.qbii;
let router = new Router();
router.prefix(config.prefix);

let result:Result = new Result();

router.get("/user/userId",function(ctx,next){
	//console.log(result);
	var _result = 
		{
		aa:1
		}
	
	ctx.body=_result
})



//module.exports = router
export default router;