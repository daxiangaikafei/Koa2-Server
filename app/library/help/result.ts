import LocalConfig from './../../config'
const config:LocalConfig = require("./../../config/index");

const Error = config.error;
class Result {
    constructor() {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = {};
        this.getValue = this.getValue.bind(this);
    }
    private resultCode : number;
    private resultMessage : string;
    private result : any;
    success(result ?: any) {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = result;
        return this.getValue();
    }
    error(code : number, errorMsg ?: string) {
        this.resultCode = code;
        this.resultMessage = Error[code]||errorMsg;
        return this.getValue();
        //this.result = {};
        //console.log(code,'ddddd');
    }
    getValue() {
        let resultCode = this.resultCode;
        let resultMessage = this.resultMessage;
        let result = this.result;
        //console.log( resultCode, resultMessage, result)
        return {code:resultCode, message:resultMessage, result}
    }
}

export default Result;