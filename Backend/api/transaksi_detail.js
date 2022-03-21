const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const transaksi_detail =
    require("../models/index").tb_detail_transaksi

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
    transaksi_detail.findAll()
        .then(result => {
            res.json({
                data_transaksi: result,
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
    // Deklarasi semua variable dalam table database transaksi_detail
    let data = {
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        keterangan: req.body.keterangan || "tidak ada keterangan"
    }

    transaksi_detail.create(data)
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
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        keterangan: req.body.keterangan
    }

    let id = {
        id: req.body.id
    }

    transaksi_detail.update(data, {
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

    transaksi_detail.destroy({
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