const express = require('express')
const app = express()
var CryptoJS = require("crypto-js");

// Ambil konfig
const {
    secretKey
} = require('../config/config');

// Password Encryption dengan menggunakan library crypto-js
// Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

// Panggil Model dari sequelize db:migrate
const user = require("../models/index").tb_user

// Berikan akses 'request-body'
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("./middleware/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    user.findAll({
            include: [{
                all: true,
                nested: true
            }]
        })
        .then(result => {
            res.json({
                data_user: result,
                found: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                found: false
            })
        })
})

// Add data
app.post('/', async (req, res) => {
    // Deklarasi semua variable dalam table database user
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: encrypt(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }

    user.create(data)
        .then(result => {
            res.json({
                message: "Data inserted",
                isSuccess: true,
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})

// Update data
app.put('/', async (req, res) => {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: encrypt(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }

    let id = {
        id: req.body.id
    }

    user.update(data, {
            where: id
        })
        .then(result => {
            res.json({
                message: "Data updated",
                isSuccess: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})
// Delete data
app.delete('/:id', async (req, res) => {
    let parameter = {
        id: req.params.id
    }

    user.destroy({
            where: parameter
        })
        .then(result => {
            res.json({
                message: "Data deleted",
                isSuccess: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})

module.exports = app