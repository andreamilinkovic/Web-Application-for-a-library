import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reservation = new Schema({
    book: {
        type: String
    },
    person: {
        type: String
    },
    accepted: {
        type: Boolean
    }
})

export default mongoose.model("ReservationModel", Reservation, "reservations");