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
        weixin: RouterConfig;
        item: RouterConfig;
        itemUC: RouterConfig;
    };
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
    weixins:any;
    gateway:any;
}

interface RouterConfig {
    domain: any;
    prefix: any;
    timeout: any;
    routes: any;
}