interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

let developments:Config={
    "error":{
        "200":"未登录",
        "404":"未发现",
        "500":"内部错误",
        "1000":"超时",
        "405":"不允许使用该方法"
    },
    "routes":{
        "qbii":{
            "domain":"http://mqbii.qbao.com/",
            "prefix":"/api/qbii",
            "timeout":5000,
            "routes":{
                    "/user/userId":{"url":"/api/user/${userId}/userId",version:"v1",versions:["v1","v2","v3"]},
                    "/user/level":{"url":"/api/user/${userId}/level",version:"v1",versions:["v1","v2","v3"]},
                    "/user/userInfo":{"url":"/api/user/${userId}/userInfo",version:"v1",versions:["v1","v2","v3"]},
                    "/news/getNewsList":{"url":"/api/news/getNewsList.html",version:"v1",versions:["v1","v2","v3"]},
                    "/user/userOrderList":{"url":"/api/user/${userId}/userOrderList.html",version:"v1",versions:["v1","v2","v3"]},
                    "/user/userProfitList":{"url":"/api/user/${userId}/userProfitList.html",version:"v1",versions:["v1","v2","v3"]},
                    "/project/list":{"url":"/api/project/${userId}/list",version:"v1",versions:["v1","v2","v3"]},
                    "/page/:projectId":{"url":"/api/page/${userId}/${projectId}",version:"v1",versions:["v1","v2","v3"]}
                    // "/project/:projectId":{"url":"/api/project/${projectId}",version:"v1",versions:["v1","v2","v3"]}
            }
        },
        "good":{
            "domain":"http://mqbii.qbao.com/",
            "prefix":"/api/good",
            "timeout":5000
        },
        "sys":{
            "domain":"http://mqbii.qbao.com",//http://mqbii.qbao.com  http://127.0.0.1:3001
            "prefix":"/api",
            "timeout":5000
        },

    },
    "ignoreUrls": {
        "/api/account4Client/login": true
    },
    "redis":{
        "tokenKey":"nodeServer-token",
        "expiration":60*60*24*15//60*60*24*30
    },
    "cookie": {
        "signed":true,
        "maxAge": 60*60*24*30, // cookie有效时长
        "secure":false,   //cookie是否只有https请求下才发送。
        "httpOnly":true,//是否只有服务器可以取到cookie，默认为true。
        //"overwrite": false  // 是否允许重写
    },
    "SSO":false// 是否只允许一台机器登录
}

module.exports = developments;