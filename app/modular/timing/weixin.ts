import Weixin from "./../weixin/interface";
import Config from '../../config'
import Timming from "./../../library/help/timming";
import ConfigHelp from "./../../library/help/config";
// import * as later from "later";
// later.date.localTime();


// async function  getWeiXinInfo(key){
// let configHelp = new ConfigHelp();
// let getWeiXinInfo = async(key) => {
//     let weixin = new Weixin(key);
//     let tokenInfo : any = await weixin.configTokenGet();
//     let jsTicketInfo : any;
//     if (!tokenInfo.errcode) {
//         configHelp.saveWeiXinInfo(key,{"accesTokenInfo":tokenInfo});
//         jsTicketInfo = await (weixin.ticketJsGet(tokenInfo.access_token));
//         if (jsTicketInfo.errcode === 0) {
//             configHelp.saveWeiXinInfo(key,{"jsTicketInfo":jsTicketInfo});
//             return;
//         }
//     }
//     throw {
//         ...tokenInfo,
//         ...jsTicketInfo
//     };

// }
// let getConfig = (key) => {
//     return Config.weixins[key]
// }

// export default function (key) {
//     getWeiXinInfo(key)
//     // let tempConfig : any = getConfig(key).timing.getConfig;
//     // console.log("微信配置信息" + key, tempConfig);
//     // let timming = new Timming();
//     // timming.creatJob(() => {
//     //     return getWeiXinInfo(key);
//     // }, tempConfig.time, tempConfig.warnTime);
// }