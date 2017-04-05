
import * as help from "./../../help/index";



let config = help.envChange({
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

module.exports = config;