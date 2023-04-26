import express from "express";
import Item from "../models/item.js";

const itemRouter = express.Router();

//Add items
itemRouter.route("/add").post((req,res)=>{

    const itemName = req.body.itemName;
    const itemPrice = Number(req.body.itemPrice);
    const url = req.body.url;

    const newItem =  new Item({
        itemName,
        itemPrice,
        url,
    })

    newItem.save().then(()=>{
        res.json("Item added successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

//get items
itemRouter.route("/").get((req,res)=>{
    Item.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})

//update item
itemRouter.route("/update/:id").put(async (req, res) => {
    let itemID = req.params.id;
    const {itemName, itemPrice} = req.body;

    const updateItem = {
        itemName, 
        itemPrice
    }

    const update = await Item.findByIdAndUpdate(itemID, updateItem).then(() => {
        res.status(200).send({status: "Item updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating items", error: err.message});
    })
})

//delete item
itemRouter.route("/delete/:id").delete(async (req,res) => {
    let itemID = req.params.id;

    await Item.findByIdAndDelete(itemID).then(() => {
        res.status(200).send({status: "Item deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting item", error: err.message});
    })
})

//get a single item
itemRouter.route("/get/:id").get(async (req,res) => {
    let itemID = req.params.id;
    await Item.findById(itemID).then((item) => {
        res.status(200).send({status: "Item fetched", item})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching item", error: err.message});
    })
})

//search item
itemRouter.get('/search/:itemName', async (req, res) => {
    const { itemName } = req.params;
    try {
      const items = await Item.find({
        itemName: { $regex: new RegExp(itemName, 'i') },
      });
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

export default itemRouter;