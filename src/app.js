// -------------------------
// public file source loading by es6
// -------------------------
import http       from 'http'
import path       from 'path'
import Koa        from 'koa'
import Convert    from 'koa-convert'
import Logger     from 'koa-logger'
import Bodyparser from 'koa-bodyparser'
import Json       from 'koa-json'

// -------------------------
// private file source loading by es6
// -------------------------
import ErrorMidd   from 'lib/error'
import RedisMidd   from 'lib/redis'
import {config}    from 'QBFK'

// -----------------------
// app init
// -----------------------
const app          = new Koa()
const debugServer  = require('debug')('app:server')
const bodyparser   = Bodyparser()

// -----------------------
// middlewares
// -----------------------
app.use(Convert(Bodyparser()))
app.use(Convert(Json()))
app.use(Convert(Logger()))
app.use(RedisMidd())

// -------------------------
// middlewares router
// -------------------------
app.use(async (ctx, next) => {
  await require('./routes').routes()(ctx, next)
})

// -------------------------
// middlewares error
// -------------------------
app.use(ErrorMidd())


const port   = parseInt(config.server_port)
const server = http.createServer(app.callback())

server.listen(port)
server.on('listening', () => {
  debugServer('listening on port: %d', port)
})

module.exports = app