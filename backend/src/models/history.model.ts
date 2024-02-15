import mongoose from "mongoose";

const Schema = mongoose.Schema;

let History = new Schema({
    id: {
        type: String
    },
    book: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    image: {
        type: String
    },
    person: {
        type: String
    },
    booked: {
        type: String
    },
    deadline: {
        type: String
    },
    returned: {
        type: String
    },
    extended: {
        type: Boolean
    }
})

export default mongoose.model("HistoryModel", History, "history");