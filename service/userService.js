/**
 * user 业务处理层
 */
const md5 = require('md5')
const userDao = require('../model/userDao.js')
const Result = require('../entity/Result');
const Util = require('../utils/util');

/**
 * 查询所有用户
 */
let findAllUser = async () => {
    let user = await userDao.findAllUser();
    //把results对象转为字符串，去掉RowDataPacket
    user = JSON.stringify(user);
    //把results字符串转为json对象  格式---[{}]
    user = JSON.parse(user);
    return new Result('0000','查询成功',user); 
    
    
}

/**
 * 用户登陆
 */
let checkLogin = async (value) => {
    let username = value.username || '';
    let password = value.password || '';

    // 检查用户名
    let user = await userDao.findUserByName(username);
    //把results对象转为字符串，去掉RowDataPacket
    user = JSON.stringify(user);
    //把results字符串转为json对象  格式---[{}]
    user = JSON.parse(user);

    if (user.length == 0) {
        return new Result('0001','用户名不存在'); 
    }
    // 检查密码
    password = md5(password);    
    if(password !== user[0].password){
        return new Result('0002','密码错误'); 
    }
    // 登陆成功
    let token = Util.genToken();
    let param = [token,user[0].userid]
    let result = await userDao.updateUserToken(param);

    // 返回结果中存在insertId即表示插入成功
    if(result.hasOwnProperty('insertId')){
        return new Result('0000','登陆成功');   
    }

}

/**
 * 注册用户
 * @param {*} value 
 */
let addUser = async (value)=> {
    let username = value.username || '';
    let password = value.password || '';

    //密码Md5加密
    password = md5(password);

    // 检查用户名是否为空
    if(!username){
        return new Result('0001','用户名不能为空');
    }
    //检查密码是否为空
    if(!password){
        return new Result('0002','密码不能为空');   
    }
    // 用户名唯一性检查  user为数组
    let user = await userDao.findUserByName(username);
    if (user.length > 0) {
        return new Result('0003','用户名已占用'); 
    }

    // 生成用户ID
    let userid = Util.genUUID();
    let param = [userid,username,password]
    let insertResult = await userDao.addUserData(param);

    // 返回结果中存在insertId即表示插入成功
    if(insertResult.hasOwnProperty('insertId')){
        return new Result('0000','添加成功');   
    }
}

module.exports = {
    checkLogin,
    addUser,
    findAllUser
};