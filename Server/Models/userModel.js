const db = require("../config");
const { ObjectId } = require("mongodb");
const UserDb = db.collection("Users");

class UserModel {
    static async addUser(data){
        const newData = await UserDb.findOne({email: data.email})
        if(!newData){
            return UserDb.insertOne(data)
        } else {
            return 'EXIST'
        }
    }

    static async findUser(data){
        const loginData = await UserDb.findOne({email: data.email})
        if (loginData) {
            return loginData
        } else {
            return 'INVALID'
        }
    }
}

module.exports = UserModel

