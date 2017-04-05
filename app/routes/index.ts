import * as routers_qbii from "./../modular/qbii/index";
import * as routers_good from "./../modular/good/index";

import * as router from "koa-router";


let routes:router[]= [
	routers_qbii,
	routers_good
];
//module.exports = router
export default routes;