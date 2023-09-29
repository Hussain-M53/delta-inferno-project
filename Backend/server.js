require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { hash, compare } = require('bcryptjs');

const server = express();

//middlewares
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }))
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
server.use(express.json())//equivalent of body parser 

app.use("/get-quote", Quotatio);

server.listen(process.env.PORT, () => {
    console.log(`Sever is listening on port ${process.env.PORT}`);
})

