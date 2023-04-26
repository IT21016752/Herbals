import React,{useState} from "react"
import axios from "axios";

export default function AddPayInfo(){

  const [userId,setuserId]= useState("");
  const [name,setName]= useState("");
  const [amount,setAmount]= useState("");
  const [date,setDate]= useState("");
  const [cardNo,setCardNo]= useState("");
  const [expDate,setExpDate]= useState("");
  const [cvc,setCvc]= useState("");
  const [pStatus,setPstatus]= useState("");

function sendData(e){
  e.preventDefault(); 

  const newPayment ={
      userId,
      name,
      amount,
      date,
      cardNo,
      expDate,
      cvc,
      pStatus

  }

  axios.post("http://localhost:8091/payment/add",newPayment).then(()=>{
    alert("Payment infromation added")
    setuserId("");
    setName("");
    setAmount("");
    setDate("");
    setCardNo("");
    setExpDate("");
    setCvc("");
    setPstatus("");


    }).catch((err)=>{
      alert(err)
  })
}

    return(
      <div className="container">
        <form onSubmit={sendData}>
        <div class="form-group">
          <label for="userId">User ID:</label>
          <input type="text" class="form-control" id="userId"  placeholder="Enter user id" onChange={(e)=>{

      setuserId(e.target.value);
          }}/>
          </div>
          
        <div class="form-group">
          <label for="name">Name of the Card holder:</label>
          <input type="text" class="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{

      setName(e.target.value);
          }}/>
        
        </div>
        <div class="form-group">
        <label for="amount">Amount:</label>
          <input type="text" class="form-control" id="amount"  placeholder="add amount"  onChange={(e)=>{

      setAmount(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="date">Date:</label>
          <input type="text" class="form-control" id="date"  placeholder="date"onChange={(e)=>{

      setDate(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="cardNo">Credit/Debit card No. :</label>
          <input type="text" class="form-control" id="cardNo"  placeholder="card no"  onChange={(e)=>{

      setCardNo(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="expDate">ECard Expiration:</label>
          <input type="text" class="form-control" id="expDate"  placeholder="2024/10"  onChange={(e)=>{

      setExpDate(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="cvc">CVC:</label>
          <input type="text" class="form-control" id="cvc"  placeholder="111"  onChange={(e)=>{

      setCvc(e.target.value);
          }}/>
        </div>

        <div class="form-group">
        <label for="pStatus">Payment Status:</label>
          <input type="text" class="form-control" id="pStatus"  placeholder="paid/notpaid"  onChange={(e)=>{

      setPstatus(e.target.value);
          }}/>
        </div>
        
        <button type="submit" class="btn btn-primary">PAY</button>
      </form>
      </div>

    
          )


}