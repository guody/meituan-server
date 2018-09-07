/**
 * 用户类路由
 */
const router = require('koa-router')()

const userController = require('../controller/userController')

router.post('/login', userController.login)
router.post('/regist', userController.regist)

module.exports = router