import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Review = new Schema({
    book: {
        type: String
    },
    username: {
        type: String
    },
    grade: {
        type: Number
    },
    comment: {
        type: String
    },
    date: {
        type: String
    },
    edited: {
        type: Boolean
    }
})

export default mongoose.model("ReviewModel", Review, "reviews");