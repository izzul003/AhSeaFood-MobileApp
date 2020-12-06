const Model = require('../Models/userModel')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    static async register(req, res){
        console.log('masuk register controller', req.body)
        try {
            let { email, password} = req.body
            password = bcrypt.hashSync(password, 10)
            const newData = await Model.addUser({email, password})
            if(newData === 'EXIST'){
                return res.status(401).json({message: 'Email Already Registered'})
            } else {
                res.status(201).json(newData.ops[0]);
            }            
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    }

    static async login(req, res){
        try {
            const { email, password } = req.body
            const user = await Model.findUser({email, password})
            if (user !== 'INVALID') {
                const compare = bcrypt.compareSync(password, user.password)
                if (compare) {
                    const access_token = JWT.sign({email}, process.env.JWT_SECRET)
                    return res.status(200).json({message: 'Berhasil Login', access_token, email: user.email})
                } else {
                    return res.status(401).json({message: 'INVALID EMAIL OR PASSWORD'})
                }
            } else {
                return res.status(401).json({message: 'INVALID EMAIL OR PASSWORD'})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

module.exports = UserController
