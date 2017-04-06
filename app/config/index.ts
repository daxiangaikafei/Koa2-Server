
import * as help from "./../../help/index";

let result:Config;

let config:Config = help.envChange({
    "development":function(){
        result = require("./env/development");
        return result;
    },
    "production":function(){
        result = require("./env/development");
        return result;
    },
    "release":function(){
         result = require("./env/development");
        return result;
    }
})

module.exports = config;