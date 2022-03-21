const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
var CryptoJS = require("crypto-js")

//Ambil Config
const {
    secretKey
} = require("../../config/config");

//Password Encryption dengan menggunakan library crypto-js
//Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

//Panggil model
const user = require("../../models/index").tb_user

//allow req body
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.post('/', async (req, res) => {
    //post data
    let data = {
        username: req.body.username,
        password: encrypt(req.body.password),
        role: req.body.role
    }

    //Menampilkan hasil
    let result = await user.findOne({
        where: data
    })

    if (result === null) {
        res.json({
            messages: "Invalid Username or Password or Level",
            isLogged: false
        })
    } else {
        //jwt
        let jwtHeader = {
            algorithm: "HS256",
            //expiresIn: exp.expToken // 1s 1h 1d 1w 1y
        }
        let payload = {
            data: result
        }
        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            isLogged: true
        })

    }
})

module.exports = app