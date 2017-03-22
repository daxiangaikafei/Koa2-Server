import ReturnObj   from 'model/return'
import QBFK        from 'QBFK'
import fs          from 'fs'

// -------------------------
// this is a demo 
// -------------------------
module.exports = async (ctx, next) => {

    // var zero = await ctx.redis.set('xx','demodemo',{
    //     expire : 10
    // })
    // var one = await ctx.redis.get('xx')
    // console.log('one',one)
    

    var obj = new ReturnObj({
            isSuccess : true ,
            message   :await ctx.redis.get('xiaolin')
    })
    
    ctx.body = obj
}