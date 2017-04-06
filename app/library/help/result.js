"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Result = (function () {
    function Result() {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = {};
        this.getValue = this.getValue.bind(this);
    }
    Result.prototype.success = function (result) {
        this.resultCode = 0;
        this.resultMessage = "success";
        this.result = result;
    };
    Result.prototype.error = function (code, errorMsg) {
        this.resultCode = code;
        this.resultMessage = errorMsg;
        console.log(code, 'ddddd');
    };
    Result.prototype.getValue = function () {
        var resultCode = this.resultCode;
        var resultMessage = this.resultMessage;
        var result = this.result;
        console.log(resultCode, resultMessage, result);
        return { resultCode: resultCode, resultMessage: resultMessage, result: result };
    };
    return Result;
}());
exports.default = Result;
//# sourceMappingURL=result.js.map