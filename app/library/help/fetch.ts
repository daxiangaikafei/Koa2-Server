import {size} from "lodash";
import * as fetch from "isomorphic-fetch";

class Fetch {
    constructor(domain:string,timeout:number = 5000){
        this.domain = domain;
        this.timeout = timeout;
    }
    setDomain(domain:string){
        this.domain = domain;
    }
    setTimeout(timeout){
        this.timeout = timeout;
    }
    private domain:string;
    private timeout:number;
    getData(url:string,param={},type="GET",headers,repType="json",timeout){
        if(type.toLocaleUpperCase()==="GET"&&size(param)>0){
           url +="?"+toExcString(param)
        }
        headers = headers?headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        };

        
        //console.log("服务器请求 url",url);
        return timeoutPromise(timeout||this.timeout,fetch(this.domain+url, {
            method: type ? type : "GET",
            headers: headers,
            //credentials: 'same-origin',
            body: type.toLocaleUpperCase()==="GET"?undefined:(repType=="json"?JSON.stringify(param):param)
        })
        .then((res) => {
            return res.json()
        }).catch((e)=>{
            console.log(e);
        }));
    }
}


const timeoutPromise = function(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}


const toExcString = function(array,type={":":"=",",":"&"}){

    let result ="";
    for(var temp in array){
        result+= temp+'='+ encodeURI(array[temp])+"&"
    }
    return result.substring(-1,result.length-1);
}

export default Fetch;
