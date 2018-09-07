/**
 * 用户信息 数据库操作
 */
const { operateDB } = require('../utils/mysql')

// 查询用户
var getUserById = async (value) => {
    let _sql =  `select * from user where level=? and nick=?`
    let user = await operateDB(_sql,value);
    if (user) {
        return user;
    } else {
        return null;
    }
};

module.exports = {
    getUserById : getUserById
};


