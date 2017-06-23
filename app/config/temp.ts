
// export const a = "xxxxxxx";
// export default (()=>{
//     return {
//         aa:"sss"
//     }
// })()

// import Redis from "./../library/help/redis";

class Data{
    constructor(){

    }
     data={};
     init(){

        let _this = this;
        return new Promise((rev,reb)=>{
            setTimeout(function(){
                _this.data = {"aaa":"llllllll"};
                rev({"aaa":"llllllll"});
            },100)
        })
    }
}
let fg = new Data();

// export let init = FG;

export default fg;

  

// let data : any = {};

// export function init() {
//     return new Promise((rev, reb) => {
//         setTimeout(function () {
//             data = {
//                 "aaa": "llllllll"
//             };
//             rev({"aaa": "llllllll"});
//         }, 100)
//     })
// };

// export default data;