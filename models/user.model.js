const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        collection: 'users'
    })

UserSchema.statics.signup = async function (
    username,
    email,
    password,
) {
    try {
        const user = await this.create({ username, email, password })
        return user
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("User", UserSchema)
