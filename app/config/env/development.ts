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
        "404":404,
        "500":500
    },
    "routes":{
        "qbii":{
            "domain":"http://mqbii.qbao.com/",
            "prefix":"/api/qbii",
            "timeout":5000
        },
        "good":{
            "domain":"http://mqbii.qbao.com/",
            "prefix":"/api/good",
            "timeout":5000
        },
        "sys":{
            "domain":"http://127.0.0.1:3001",//http://mqbii.qbao.com  http://127.0.0.1:3001
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