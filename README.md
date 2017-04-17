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

#2路由命名规则 遵循Restful规范  请求突破传统的get ,post,pul,delete
/模块名/xxxx/操作
操作{info:"详情","list":"列表"...}

比如  
/user/xxxxxx/info   查用户详情
/user  查用户列表

