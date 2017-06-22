declare interface Sysconfig {
    server:any,
    localServer:any;
    redis:any;
    qiniu:any;
}

declare interface LocalConfig  {
    error:any;
    routes:{
        qbii: RouterConfig;
        good: RouterConfig;
        sys: RouterConfig;
        item: RouterConfig;
        weixin: RouterConfig;
    };
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
    weixins:any;
}

interface RouterConfig {
    domain: any;
    prefix: any;
    timeout: any;
    routes: any;
}