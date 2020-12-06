require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./Routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', routes)

app.listen(PORT, ()=> {
    console.log(`Run in http://localhost:${PORT}`)
})

module.exports = app