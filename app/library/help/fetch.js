"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var fetch = require("isomorphic-fetch");
var Fetch = (function () {
    function Fetch(domain, timeout) {
        if (timeout === void 0) { timeout = 5000; }
        this.domain = domain;
        this.timeout = timeout;
    }
    Fetch.prototype.setDomain = function (domain) {
        this.domain = domain;
    };
    Fetch.prototype.setTimeout = function (timeout) {
        this.timeout = timeout;
    };
    Fetch.prototype.getData = function (url, param, type, headers, repType, timeout) {
        if (param === void 0) { param = {}; }
        if (type === void 0) { type = "GET"; }
        if (repType === void 0) { repType = "json"; }
        if (type.toLocaleUpperCase() === "GET" && lodash_1.size(param) > 0) {
            url += "?" + toExcString(param);
        }
        headers = headers ? headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        };
        //console.log("服务器请求 url",url);
        return timeoutPromise(timeout || this.timeout, fetch(this.domain + url, {
            method: type ? type : "GET",
            headers: headers,
            //credentials: 'same-origin',
            body: type.toLocaleUpperCase() === "GET" ? undefined : (repType == "json" ? JSON.stringify(param) : param)
        })
            .then(function (res) {
            return res.json();
        }).catch(function (e) {
            console.log(e);
        }));
    };
    return Fetch;
}());
var timeoutPromise = function (ms, promise) {
    return new Promise(function (resolve, reject) {
        var timeoutId = setTimeout(function () {
            reject(new Error("promise timeout"));
        }, ms);
        promise.then(function (res) {
            clearTimeout(timeoutId);
            resolve(res);
        }, function (err) {
            clearTimeout(timeoutId);
            reject(err);
        });
    });
};
var toExcString = function (array, type) {
    if (type === void 0) { type = { ":": "=", ",": "&" }; }
    var result = "";
    for (var temp in array) {
        result += temp + '=' + encodeURI(array[temp]) + "&";
    }
    return result.substring(-1, result.length - 1);
};
exports.default = Fetch;
//# sourceMappingURL=fetch.js.map