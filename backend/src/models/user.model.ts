import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    tel: {
        type: String
    },
    mail: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    registered: {
        type: Boolean
    },
    blocked: {
        type: Boolean
    }
})

export default mongoose.model("UserModel", User, "users");