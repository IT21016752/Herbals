import express from "express";
import payment from "../models/payment.js";

const payRouter = express.Router();

payRouter.route("/add").post((req,res)=>{

    //body 
    const email = req.body.email;
    const name = req.body.name;
    const amount= Number(req.body.amount);
    const date= req.body.date;
    const cardNo= req.body.cardNo;
    const expDate =req.body.expDate;
    const cvc =Number(req.body.cvc);
    const pStatus=req.body.pStatus;

    const newPayment = new payment({
        email,
        name,
        amount,
        date,
        cardNo,
        expDate,
        cvc,
        pStatus
    })

    newPayment.save().then(()=>{
        //body
        res.json("Order added");
    }).catch((err)=>{
        console.log(err);
    })

})

payRouter.route("/").get((req,res)=>{  

    //findbyid for single one

    payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
})
})


payRouter.route("/update/:id").put(async(req,res)=>{
    let payid=req.params.id;
    const{email,name,amount,date,cardNo,expDate,cvc,pStatus} =req.body;

    const updatePayment ={
        email,
        name,
        amount,
        date,
        cardNo,
        expDate,
        cvc,
        pStatus
    }

    const update = await payment.findByIdAndUpdate(payid,updatePayment)
    .then(()=>{
        res.status(200).send({status:"Payment information updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error:err.message});

    })


})


payRouter.route("/delete/:id").delete(async(req,res)=>{
    let payid =req.params.id;

    await payment.findByIdAndDelete(payid)
    .then(() =>{
      res.status(200).send({status: "Order deleted"});
    }).catch((errr)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error:err.message});

    })
})

//get only one payment data
payRouter.route("/get/:id").get(async (req,res) =>{
    let payid = req.params.id;
    const pay=await payment.findById(payid)
      .then((pay)=>{
         res.status(200).send({status:"Order information selected",pay})
    }).catch((err) =>  {
        console.log(err.messsage);
        res.status(500).send({status:"Error with Order viewing ",error:err.message});
    }   )
})

export default payRouter;