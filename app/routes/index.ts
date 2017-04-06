import * as Router from "koa-router";
let routers_qbii:Router = require("./../modular/qbii/index");
let routers_good:Router = require("./../modular/qgoodbii/index");

let routes:Router[]= [
	routers_qbii,
	routers_good
];
//module.exports = router
export default routes;