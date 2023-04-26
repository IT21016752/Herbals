//const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema=mongoose.Schema;
const deliveryschema = new Schema({
    uid : {
        type : String,
        required : true
    },
    contactName : {
        type : String,
        required : true
    },
    address:{
        type :String,
        required : true
    },
    province:{
        type :String,
        required : true
    },
    phone:{
        type :String,
        required : true
    },
    price:{
        type :Number,
        required : true
    },
    time:{
        type :Number,
        required : true
    }
})

const delivery = mongoose.model("DeliveryInfo",deliveryschema);

export default  delivery;