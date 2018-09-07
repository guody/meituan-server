/**
 * 用户类 controller
 */
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const userService = require('../service/userService.js')

let getUserDataById = async (ctx, next) => {
    let level = ctx.query.level;
    let nick = ctx.query.nick;

    let value =[level,nick]   
    let userInfo = await userService.getUserById(value);
    // 用户不存在
    if(!userInfo){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    ctx.body = userInfo
};



let saveUserinfo = (ctx, next) => {
    const requestString = ctx.data;
    //TODO数据处理
    Console.log(requestString);
};

module.exports = {
    'getUserDataById': getUserDataById,
    'saveUserinfo': saveUserinfo
};