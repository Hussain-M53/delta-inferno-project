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

app.use("/Customer", CustomerRouter);


//api methods
server.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = database.find(user => user.email === email);
        if (user) throw new Error("User already exist")
        const hashedPass = await hash(password, 10);//hashed the pass using salt
        database.push({
            id: database.length,
            email,
            password: hashedPass
        });

        res.send({
            message: "User created"
        })
        console.log(database)
    } catch (error) {
        res.send({
            error: `${error.message}`
        })
    }
})

server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = database.find(user => user.email === email);
        if (!user) throw new Error("User doesnot exist")
        const valid = await compare(password, user.password)
        if (!valid) throw new Error("Incorrect Password")

        const accessToken = createAccessToken(user.id)
        const refreshToken = createRefreshToken(user.id)

        user.refreshToken = refreshToken;
        console.log(database);
        sendRefreshToken(res, refreshToken)
        sendAccessToken(req, res, accessToken)
    } catch (error) {
        res.send({
            error: `${error.message}`
        })
    }

})

server.post('/logout', (_req, res) => {
    res.clearCookie('refreshToken',{path:'/refresh_token'})
    return res.send({
        message: 'logged out'
    })
})

server.post('/protected', async (req, res) => {
    try {
        const userID = isAuth(req)
        if (userID != null) {
            res.send({
                data: 'this is protected data'
            })
        }
    } catch (error) {
        res.send({
            message: `${error.message}`
        })
    }
})

server.post('/refresh_token', (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.send({
        accessToken: '',
    });
    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        return res.send({
            accessToken: '',
        })
    }

    const user = database.find(user => user.id === payload.userID)
    if (!user) return res.send({
        accessToken: '',
    })
    if (user.refreshToken != token) {
        return res.send({
            accessToken: '',
        })
    }
    const accessToken = createAccessToken(user.id)
    const refreshToken = createRefreshToken(user.id)
    user.refreshToken = refreshToken;
    sendRefreshToken(res, refreshToken)
    sendAccessToken(req, res, accessToken)

})

server.listen(process.env.PORT, () => {
    console.log(`Sever is listening on port ${process.env.PORT}`);
})

