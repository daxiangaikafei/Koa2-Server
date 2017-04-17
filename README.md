#1
/api/qbii/v1/xxx



#1获取前端 传递参数方式


 1. post     x-wwww-from-urlencoded   let searchParam  = ctx.request.body;
 2. get                               let searchParam = ctx.request.query;
 3. post     application/json         let searchParam = ctx.request.body;


  ctx.request.fields;
 4. /xx/xx/:xx                              let searchParam =  ctx.params

 #1 获取用户id

 ctx.userId

 #1  统一返回值

{
    code:Number,
    message:String,
    result:Object
}

#1 错误列表
200:"未登录",
404:"未发现",
405:"不允许使用该方法",
500:"内部错误",
1000:"超时",
0:"成功" //非0都失败

#2  路由配置文件
app/config/env/developments.ts