const db = require("../config");
const { ObjectId } = require("mongodb");
const FoodDb = db.collection("Foods");

class FoodModel {
    static async createFood(data){
        const newFood = await FoodDb.insertOne(data)
        return newFood 
    }

    static async fetchFood(){
        const foods = await FoodDb.find().toArray()
        return foods 
    }
}

module.exports = FoodModel