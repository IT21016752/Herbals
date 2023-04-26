import express from "express";
import delivery from "../models/delivery.js";

const deliveryRouter = express.Router();

deliveryRouter.route("/add").post((req,res)=>{
    

    //body 
    const uid = Number(req.body.uid);
    const contactName= req.body.contactName;
    const address= req.body.address;
    const province =req.body.province;
    const phone =req.body.phone;
    const price=Number(req.body.price);
    const time=Number(req.body.time);

    const newDelivery = new delivery({

        uid,
        contactName,
        address,
        province,
        phone,
        price,
        time
    })

    newDelivery.save().then(()=>{
        //body
        res.json("Delivery information added");
    }).catch((err)=>{
        console.log(err);
    })

})


deliveryRouter.route("/").get((req,res)=>{//not sure

    delivery.find().then((deliverys)=>{
        res.json(deliverys)
    }).catch((err)=>{
        console.log(err)
})
})


deliveryRouter.route("/update/:id").put(async(req,res)=>{
    let delid=req.params.id;
    const{ uid,contactName,address,province,phone,price,time} =req.body;

    const updateDelivery ={
        uid,
        contactName,
        address,
        province,
        phone,
        price,
        time
    }

    const update = await delivery.findByIdAndUpdate(delid,updateDelivery)
    .then(()=>{
        res.status(200).send({status:"delivery information updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error:err.message});

    })


})


deliveryRouter.route("/delete/:id").delete(async(req,res)=>{
    let delid =req.params.id;

    await delivery.findByIdAndDelete(delid)
    .then(() =>{
      res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error:err.message});

    })
})

//get only one users data
deliveryRouter.route("/get/:id").get(async (req,res) =>{
    let delid = req.params.id;
    const deli=await delivery.findById(delid)
      .then((deli)=>{
         res.status(200).send({status:"delivery information selected",deli})
    }).catch((err) =>  {
        console.log(err.messsage);
        res.status(500).send({status:"Error with get user ",error:err.message});
    }   )
})

export default  deliveryRouter;