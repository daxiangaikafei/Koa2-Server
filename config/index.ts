
import {envChange} from "./../help/index";

// import development from "./env/development";
// import production from "./env/production";
// import release from "./env/release";

//console.log(envChange);

let config = envChange({
    "development":function(){
        return require("./env/development");
    },
    "production":function(){
        return require("./env/production");
    },
    "release":function(){
        return require("./env/release");
    }
})

//console.log("系统配置信息为:",config);

module.exports = config;