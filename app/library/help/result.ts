import * as json from "./../../config/index";
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
    success(result : any) {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = result;
    }
    error(code : number, errorMsg : string) {
        this.resultCode = code;
        this.resultMessage = errorMsg;
        //console.log(code,'ddddd');
    }
    getValue() {
        let resultCode = this.resultCode;
        let resultMessage = this.resultMessage;
        let result = this.result;
        //console.log( resultCode, resultMessage, result)
        return {resultCode, resultMessage, result}
    }
}

export default Result;