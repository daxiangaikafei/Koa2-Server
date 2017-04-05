"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envChange = function (envObj) {
    switch (process.env.NODE_ENV) {
        case "development":
            return envObj.development && envObj.development();
        case "production":
            return envObj.production && envObj.production();
        case "release":
            return envObj.release && envObj.release();
        default:
            return undefined;
    }
};
//# sourceMappingURL=util.js.map