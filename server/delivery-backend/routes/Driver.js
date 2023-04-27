import express from 'express';
//import router from express.Router();
//const Driver = require('./models/Driver');
import driver from "../models/driver.js";

const Driverrouter = express.Router(); // Define router object

Driverrouter.route("/add").post((req,res)=>{
    

  //body 

  const driverId = req.body.driverId;
  const name= req.body.name;
  const phoneNumber =req.body.phoneNumber;


  const newDriver = new driver({

    driverId,
    name,
    phoneNumber
  })

  newDriver.save().then(()=>{
      //body
      res.json("Driver information added");
  }).catch((err)=>{
      console.log(err);
  })

})


Driverrouter.route("/").get((req,res)=>{//not sure

  driver.find().then((driverr)=>{
      res.json(driverr)
  }).catch((err)=>{
      console.log(err)
})
})


Driverrouter.route("/update/:id").put(async(req,res)=>{
  let drid=req.params.id;
  const{ driverId,name,phoneNumber} =req.body;

  const updateDriver ={
    driverId,
    name,
    phoneNumber
  }

  const update = await driver.findByIdAndUpdate(drid,updateDriver)
  .then(()=>{
      res.status(200).send({status:"Driver information updated"})
  }).catch((err)=>{
      console.log(err);
      res.status(500).send({status: "Error with updating data",error:err.message});

  })


})


Driverrouter.route("/delete/:id").delete(async(req,res)=>{
  let drid =req.params.id;

  await driver.findByIdAndDelete(drid)
  .then(() =>{
    res.status(200).send({status: "User deleted"});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with deleting data",error:err.message});

  })
})

//get only one users data
Driverrouter.route("/get/:id").get(async (req,res) =>{
  let drid = req.params.id;
  const dri=await driver.findById(drid)
    .then((dri)=>{
       res.status(200).send({status:"delivery information selected",dri})
  }).catch((err) =>  {
      console.log(err.messsage);
      res.status(500).send({status:"Error with get user ",error:err.message});
  }   )
})
// // endpoint that retrieves only the driver IDs from the database.
// Driverrouter.route("/driverIds").get((req,res)=>{
//   driver.find({}, {driverId: 1, _id: 0}).then((driverIds)=>{
//       res.json(driverIds)
//   }).catch((err)=>{
//       console.log(err)
// })
// })

export default  Driverrouter;