import * as winston from "winston";
require('winston-daily-rotate-file')

if (!process.getuid) {
    process.getuid = ()=>{
        return 0
    }
}

var log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new winston.transports.DailyRotateFile({filename: 'request', datePattern: '_yyyy-MM-ddTHH.log'})
    //   new (winston.transports.File)({ filename: 'normal.log', maxsize: 1024 * 10})
    ]
  });



const logger = function(){
    return log;
}

var Logger = {
    error:function(param1 ?:any,param2 ?:any,param3 ?:any){
        param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.error(param1,param2,param3);
    },
    info:function(param1 ?:any,param2 ?:any,param3 ?:any){
        console.log(process)
        param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.info(param1,param2,param3);
    },
    warn:function(param1 ?:any,param2 ?:any,param3 ?:any){
         param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.warn(param1,param2,param3);
    }
}


export default Logger;
// module.exports = logger;