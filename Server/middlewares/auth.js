const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken')

module.exports = class auth {
    static async authentication (req, res, next) {
        try {
            if (!req.headers.access_token) {
                console.log('masuk auth 1')

                return res.status(401).json({message: 'Not Authorized'})
            }
            const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
            const user = await UserModel.findUser(payload)
            if (!user) {
                console.log('masuk auth 2')
                res.status(401).json({mesage: 'Not Authorized'})
            } else {
                console.log('masuk auth sukses')
                req.userLogin = user
                next()
            }
        } catch (error) {
            console.log('masuk auth 3', req.headers, error.message)

            res.status(401).json({message: 'Not Authorized'})
        }
        
    }
}