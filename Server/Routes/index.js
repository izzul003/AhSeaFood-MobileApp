const route = require('express').Router()
const auth = require('../middlewares/auth')
const UserController = require('../Controllers/userController')
const FoodController = require('../Controllers/foodController')
const CartController = require('../Controllers/cartController')

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.post('/foods', FoodController.create)
route.get('/foods', FoodController.read)

route.use(auth.authentication)
route.post('/carts', CartController.create)
route.get('/carts', CartController.read)
route.put('/carts/:id', CartController.update)

module.exports = route