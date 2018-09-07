/**
 * 用户类 controller
 */
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const userService = require('../service/userService.js')

/**
 * 用户登陆
 */
let login = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.checkLogin(userData);
    ctx.body = result
};

/**
 * 注册用户
 */
let regist = async (ctx, next) => {
    let userData = ctx.request.body;
    let result = await userService.addUser(userData);
    ctx.body = result
};


module.exports = {
    login,
    regist
};