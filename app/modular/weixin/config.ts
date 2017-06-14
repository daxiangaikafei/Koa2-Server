// ///
// import RedisData from "./redisData";


// // let config:Hee;

// let redis = new RedisData("configInfo");



// export const  getWeiXinInfo = async(key)=>{
//         let data= await this.getData();
//         return data.weixins["key"]||{};
//     };

//  export const saveWeiXinInfo =  async(key,info)=>{
//         let result = await this.getData();
//         let temp = result.weixins||{[key]:{}};
//         for(let keys in info){
//             temp[key][keys] = info[keys];
//         }
//         let weixins = Object.assign({},result.weixins,temp);
//         result.weixins = weixins;
//         return redis.saveData(result);
//     }

