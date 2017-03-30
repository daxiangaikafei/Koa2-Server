import Router from "koa-router";

const router = new Router()
router.prefix('/api')


// var Result = require("./../api/result");
// var result = new Result();



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