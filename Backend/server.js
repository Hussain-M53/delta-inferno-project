require('dotenv/config');
const express = require('express');
const cors = require('cors');
const QuotationRoute = require('./Routes/QuotationRoute')
const PaymentRoute = require('./Routes/PaymentRoute')

const server = express();

server.use(express.urlencoded({ extended: true }))

server.use(cors({
    origin: ['http://localhost:3000', 'https://www.expertassignmentnation.com'],
    credentials: true,
}))

server.use(express.json())

server.use("/create-payment-session", PaymentRoute);
server.use("/get-quote", QuotationRoute);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Sever is listening on port ${process.env.PORT}`);
})

