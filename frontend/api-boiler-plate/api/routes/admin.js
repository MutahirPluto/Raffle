const cors = require("cors");
const router = require("express").Router();
const mongoose = require('mongoose');
const crypto = require("crypto");
let { Contract } = require("../../db/models/contract");
const Schema = mongoose.Schema;
const { contract } = require("../../db/models/contract")
const UserSchema = new Schema({}, { strict: false });
const User = mongoose.model('User', UserSchema, 'users');



// router.get("/admin/check", async function (req, res) {
//     console.log(req.query)
//     // console.log(req.query)
//     // console.log(req.headers["admin-authorization"])
//     const bookingForBookingId = await contract.findOne({ address: req.query.address })
//     console.log(">>", bookingForBookingId)
//     res.status(200).send({ message: bookingForBookingId })
// })


router.post("/admin/add", async function (req, res) {
    // console.log("hello")
    // console.log(req.body.address)
    const bookingForBookingId = await contract.findOne({ address: req.body.address })
    if (!bookingForBookingId) {
        // console.log(req.headers["admin-authorization"])
        const Address = await contract.create({ address: req.body.address })
        console.log("bookingForBookingId", Address)
        return res.status(200).send({ message: "Saved" })
    }

     return res.status(200).send({ message: 'Already Exist' })
})

router.get("/admin/addr", async function (req, res) {
    console.log(req.query)
    // console.log(req.query)
    // console.log(req.headers["admin-authorization"])
    const Addresses = await contract.find()
    console.log(">>", Addresses)
    return res.status(200).send({ message: Addresses })
})


module.exports = router;
// module.exports = { Product };
