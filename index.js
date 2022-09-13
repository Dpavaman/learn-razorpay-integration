const express = require('express');
require('dotenv').config()
const Razorpay = require('razorpay')
const path = require('path')

const app = express()
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.post('/order', async (req, res) => {
    const amount = req.body.amount;

    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })

    let options = {
        amount: amount * 100, //amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
    }

    // instance.orders.create(options, (err, order) => {
    //     console.log(order)
    // })

    const myOrder = await instance.orders.create(options)

    res.status(201).json({
        success: true,
        amount,
        order: myOrder

    })

})


app.listen(4000, () => console.log("Server is up and running at port 4000..."))