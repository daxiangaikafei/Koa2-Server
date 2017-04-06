import * as Router from "koa-router";
let routers_qbii:Router = require("./../modular/qbii/index");
let routers_good:Router = require("./../modular/good/index");

let routes:Router[]= [
	routers_qbii,
	routers_good
];
//module.exports = router
module.exports = routes;