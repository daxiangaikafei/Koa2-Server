interface EnvValue {
    development:Function,
    production:Function,
    release:Function
}


export const envChange = function(envObj:EnvValue){
    switch (process.env.NODE_ENV){
        case "development":
            envObj.development&&envObj.development();
        case "production":
            envObj.production&&envObj.production();
        case "release":
            envObj.release&&envObj.release();
    }
}