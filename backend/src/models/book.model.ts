import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
    id: {
        type: Number
    },
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
    in_stock: {
        type: Number
    },
    booked: {
        type: Number
    }
})

export default mongoose.model("BookModel", Book, "books");