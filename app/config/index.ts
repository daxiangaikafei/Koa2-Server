interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}


<<<<<<< HEAD
interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}
let result:Config;
=======
import * as path from "path";
const fs = require('fs');
const env     = process.env.NODE_ENV || 'development';
>>>>>>> fabu



let config:Config =JSON.parse(fs.readFileSync(path.resolve(__dirname,'./localConfig.'+env+'.json')).toString());

module.exports = config;