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
        }
    }
}

module.exports = productionConfig;