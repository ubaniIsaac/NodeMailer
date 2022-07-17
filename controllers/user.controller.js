const usermodel = require('../models/user.model')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')
require("dotenv").config()


exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ err: "Content cannot be empty" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.signup(username, email, hashPassword);
        if (!user) {
            return res.status(500).json({
                error: err.message || "Some error occured"
            })
        }
        else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                },
                tls: { rejectUnauthorized: false }
            });

            const mailOptions = {
                from: 'isaacchimdi@gmail.com',
                to: email,
                subject: 'Welcome to nodemailer',
                text:
                    `Hi ${username} welcome to my nodemailer project.
Thanks for signing up. `
            };

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });
            return res.json({ status: "success", data: user })

        }

    } catch (error) {
        throw error
    }

}

