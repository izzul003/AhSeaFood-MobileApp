const Model = require('../Models/foodModel')

module.exports = class foodController {
    static async create(req, res){
        try {
            const { name, image, description, price, rate} = req.body
            const newFood = await Model.createFood({name, image, description, price: +price, rate} )
            res.status(201).json(newFood.ops[0])
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } 

    static async read(req, res){
        try {
            const foods = await Model.fetchFood()
            res.status(200).json(foods)
        } catch (error) {
            res.status(500).json({message: error.message})
        } 
    }

}

