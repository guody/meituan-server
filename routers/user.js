/**
 * 用户类路由
 */
const router = require('koa-router')()

const userController = require('../controller/userController')
router.get('/',async function (ctx, next) {
    ctx.body = 'this a users response!';
});
router.get('/login', userController.getUserDataById)

module.exports = router