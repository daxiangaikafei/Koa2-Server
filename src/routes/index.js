// -------------------------
// file source loading by es6
// -------------------------
import Router    from 'koa-router'
import indexCtrl from '../controllers'

// -------------------------
// router instance 
// -------------------------
const router = Router()

// -------------------------
// business instance
// -------------------------
router.get('/index', indexCtrl)

module.exports = router
