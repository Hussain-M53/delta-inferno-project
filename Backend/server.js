require('dotenv/config');
const express = require('express');
const cors = require('cors');
const QuotationRoute = require('./Routes/QuotationRoute')
const PaymentRoute = require('./Routes/PaymentRoute')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const server = express();

server.use(express.urlencoded({ extended: true }))

server.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

server.use(express.json())

server.use("/payment", PaymentRoute);
server.use("/get-quote", QuotationRoute);

server.listen(process.env.PORT, () => {
    console.log(`Sever is listening on port ${process.env.PORT}`);
})

