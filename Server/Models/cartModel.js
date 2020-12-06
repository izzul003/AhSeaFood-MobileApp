const db = require("../config");
const { ObjectId } = require("mongodb");
const CartDb = db.collection("Carts");

class CartModel {
    static async addCart(data){
        try {
            const newCart = await CartDb.insertOne(data)
            return newCart            
        } catch (error) {
            return error
        }
    }

    static async findByUserId(UserId){
        try {
            const findAll = await CartDb.find({UserId}).toArray()
            return findAll
        } catch (error) {
            return error
        }
    }

    static async updateCart(id, data){
        try {
            const updateCart = CartDb.findOneAndUpdate({_id: ObjectId(id)},  {$set: data}, {returnOriginal: false}) 
            return updateCart
        } catch (error) {
            return error
        }
    }
}

module.exports = CartModel