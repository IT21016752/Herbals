import mongoose from "mongoose";

const Schema = mongoose.Schema;

//This will create the items table
const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },

    url: {
        type: String
    }
})

const Item = mongoose.model("Item", itemSchema);

export default Item;