/**
 * user 业务处理层
 */

const userDao = require('../model/userDao.js')

let getUserById = async (value) => {
    let users = await userDao.getUserById(value);
    //把results对象转为字符串，去掉RowDataPacket
    users = JSON.stringify(users);
    //把results字符串转为json对象
    users = JSON.parse(users);

    if(users){
        let responseContent = '';
        for(user of users){
            responseContent += '姓名：' + user.name;
        }
        return responseContent;
    }

}

module.exports = {
    getUserById : getUserById
};