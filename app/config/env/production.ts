let productionConfig:Config={
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
            "domain":"http://localhost:3001",
            "prefix":"/api",
            "timeout":5000
        },

    },
    "ignoreUrls": {
        "/api/account4Client/login": true
    },
    "redis":{
        "tokenKey":"nodeServer-token"
    },
    "cookie": {
        "maxAge": 30 * 24 * 60 * 60 * 1000, // cookie有效时长
        "httpOnly": false,  // 是否只用于http请求中获取
        "overwrite": false  // 是否允许重写
    },
    SSO:false// 是否只允许一台机器登录
}

module.exports = productionConfig;