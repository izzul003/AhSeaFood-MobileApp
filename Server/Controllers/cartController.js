const Model = require('../Models/cartModel')

module.exports = class cartController {
    static async create(req, res){
        try {
            const UserId = req.userLogin._id
            let {_id, name, description, image, price, rate} = req.body
            const quantity = 1
            const status = false
            const newCart = await Model.addCart({
                UserId,
                FoodId: _id,
                name, 
                description,
                image,
                price,
                rate,
                quantity,
                status
            })
            res.status(201).json(newCart.ops[0])
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async read(req, res){
        try {
            const UserId = req.userLogin._id
            const carts = await Model.findByUserId(UserId)
            res.status(200).json(carts)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async update(req, res){
        console.log('masuk server', req. params.id, req.body)
        try {
            const id = req.params.id
            const UserId = req.userLogin._id
            let {FoodId, name, description, image, price, rate, quantity, status} = req.body
            const willUpdate = await Model.updateCart(id, {
                UserId,
                FoodId, 
                name, 
                description, 
                image, 
                price: +price, 
                rate, 
                quantity: +quantity, 
                status
            })
            res.status(200).json(willUpdate.value)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}