import * as path from "path";
const fs = require('fs');
const env     = process.env.NODE_ENV || 'development';

let config:LocalConfig =JSON.parse(fs.readFileSync(path.resolve(__dirname,'./localConfig.'+env+'.json')).toString());

module.exports = config;
// export default config;

// export default