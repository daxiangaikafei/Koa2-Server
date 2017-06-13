
type Configt = {
    "weixins":weixinst
}
type weixinst = {
    "item":weixinInfot,
}
type weixinInfot = {
    "appid":string,
    "secret":string,
    "token":string,
    "tickteJs":string,
    "timing":{
        "getToken":{
            "time":string
        },
        "tickerJsGet":{
            "time":string
        }
    }
}


// module.exports = 