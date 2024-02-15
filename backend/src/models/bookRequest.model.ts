import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BookRequest = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: Array
    },
    publisher: {
        type: String
    },
    year: {
        type: String
    },
    language: {
        type: String
    },
    image: {
        type: String
    },
    person: {
        type: String
    },
    accepted: {
        type: Boolean
    }
})

export default mongoose.model("BookRequestModel", BookRequest, "book_requests");