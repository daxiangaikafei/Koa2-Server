
import {envChange} from "./../help/index";

// import development from "./env/development";
// import production from "./env/production";
// import release from "./env/release";

let sysConfig:Sysconfig;
//a.localServer = 100;

let config:Sysconfig = envChange({
    "development":function(){
        sysConfig = require("./env/development");
        return sysConfig;
    },
    "production":function(){
        sysConfig = require("./env/development");
        return sysConfig;
    },
    "release":function(){
        sysConfig = require("./env/development");
        return sysConfig;
    }
})

//console.log("系统配置信息为:",config);

module.exports = config;