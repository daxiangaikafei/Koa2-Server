import * as path from "path";
import Config from '../interface/localConfig'
const fs = require('fs');
const env     = process.env.NODE_ENV || 'development';

let config:Config =JSON.parse(fs.readFileSync(path.resolve(__dirname,'./localConfig.'+env+'.json')).toString());

module.exports = config;