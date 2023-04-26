import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: {
        type : String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    cardNo: {
        type: String,
        required: true
    },

    expDate: {
        type: String,
        required: true
    },

    cvc: {
        type: Number,
        required: true
    },

    pStatus: {
        type: String,
        required: true
    }

})

const payment = mongoose.model("payment", paymentSchema);

export default payment;
