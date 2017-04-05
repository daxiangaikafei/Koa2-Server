"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var koa = require("koa");
// import * as convert    from 'koa-convert'
var logger = require("koa-logger");
// import * as body       from 'koa-better-body'
// import * as onError    from 'koa-onerror'
var body = require("koa-bodyparser");
var config = require("./../config/index");
var lodash_1 = require("lodash");
var result_1 = require("./library/help/result");
var index_1 = require("./routes/index");
var a = require("./../config/index");
console.log(a);
var result = new result_1.default();
//console.log(process);
var app = new koa();
app.use(logger()); //日志
app.use(body({})); //表单什么数据转换 
//异常处理
// onError(app);
// app.keys = ['im a newer secret', 'i like turtle'];
// app.use(convert(session(config.serverSessionConfig,app)));
/*app.use((ctx, next) => {
  let userKey = ctx.cookies.get("userkey");
  if(!userKey&&!config.ignoreUrls[ctx.url]){
     ctx.body = {
       code:200,
       message:"您还没登录"
     }
     return next();
  }
});*/
/*处理  404   500  页面 */
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log("status", ctx.status);
                if (404 != ctx.status && 500 != ctx.status)
                    return [2 /*return*/]; //&& 500 != ctx.status
                result.error(ctx.status, "");
                ctx.body = result.getValue();
                return [2 /*return*/];
        }
    });
}); });
// app.use((ctx,next)=>{
//     return next().then((a,b)=>{
//         console.log("a",a)
//     })
// })
lodash_1.each(index_1.default, function (router, index) {
    app.use(router.routes());
    app.use(router.allowedMethods());
});
// console.log(config.localServer.port);
// app.listen(config.localServer.port);
var value = config;
app.listen(value.localServer.port);
//# sourceMappingURL=app.js.map