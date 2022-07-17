const express = require('express')
const nodemailer = require("nodemailer")
require("dotenv").config()
require('./config/mongo')


const userRouter = require('./routes/user.route')
const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT)


app.use(express.json());

app.use('/', userRouter)
app.get('/', (req, res) => {
    res.json({ message: 'Nodemailer Application' })
});

app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});



app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})