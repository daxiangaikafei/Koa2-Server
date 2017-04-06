let production:Sysconfig = {
    "server":{
        "url":"",
        "prot":"",
    },
    "localServer":{
        "port":3000
    },
    "redis":{
        "url":"",
        "port":3000
    },
     "serverSessionConfig": {
        "key": "koa:sess",
        "maxAge": 86400000,
        "overwrite": true,
        "httpOnly": true,
        "signed": true
    },
    "ignoreUrls": {
        "spdapi/login": true,
        "spdapi/loginOff": true
    },
    "qiniu": {
        "ACCESS_KEY": "",
        "SECRET_KEY": "",
        "Bucket_Name": ""
    }
}

module.exports = production;