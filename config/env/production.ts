let production:Sysconfig = {
    "server":{
        "url":"",
        "prot":"",
    },
    "localServer":{
        "port":3000
    },
    "redis":{
        "port": 6379,         
        "host": '192.168.132.40',   
        "family": 4,           // 4 (IPv4) or 6 (IPv6)
        //"password": 'auth',
        //"db": 0
    },
    "qiniu": {
        "ACCESS_KEY": "",
        "SECRET_KEY": "",
        "Bucket_Name": ""
    }
}

module.exports = production;