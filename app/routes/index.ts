import * as Router from "koa-router";
let routers_qbii:Router = require("./../modular/qbii/index");
let routers_good:Router = require("./../modular/good/index");
let routers_sys :Router = require("./../modular/sys/index");
let routers_item:Router = require("./../modular/item/index");

let routes:Router[]= [
	routers_qbii,
	routers_good,
	routers_sys,
	routers_item
];

module.exports = routes