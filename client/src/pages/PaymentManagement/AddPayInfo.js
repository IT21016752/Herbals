import React,{useState} from "react"
import axios from "axios";
import { createEntityAdapter } from "@reduxjs/toolkit";

export default function AddPayInfo(){

  const [email, setEmail] = useState("");
  const [name,setName]= useState("");
  const [amount,setAmount]= useState("");
  const [date,setDate]= useState("");
  const [cardNo,setCardNo]= useState("");
  const [expDate,setExpDate]= useState("");
  const [cvc,setCvc]= useState("");
  const [pStatus,setPstatus]= useState("");

  const [currentDate, setCurrentDate] = useState(new Date());


  //form validation

  // function validateForm() {
  //   const date = document.getElementById("date").value;
  //   const amount = document.getElementById("amount").value;
  //   const email = document.getElementById("email").value;
  //   const name = document.getElementById("name").value;
  //   const cardNo = document.getElementById("cardNo").value;
  //   const expDate = document.getElementById("expDate").value;
  //   const cvc = document.getElementById("cvc").value;
  //   const pStatus = document.getElementById("pStatus").value;
  
  //   if (date === "" || amount === "" || email === "" || name === "" || cardNo === "" || expDate === "" || cvc === "" || pStatus === "") {
  //     alert("Please fill out all fields");
  //     return false;
  //   }
  
  //   if (!/^\d{16}$/.test(cardNo)) {
  //     alert("Card number must contain exactly 16 digits");
  //     return false;
  //   }
  
  //   if (!/^\d{3}$/.test(cvc)) {
  //     alert("CVC must be 3 digits");
  //     return false;
  //   }
  
  //   const expDateRegex = /^(?<year>20\d{2})\/(?<month>0[1-9]|1[0-2])$/;
  //   const match = expDate.match(expDateRegex);
  //   if (!match) {
  //     alert("Expiration date must be in the format of 'yyyy/mm'");
  //     return false;
  //   }
  //   const { year, month } = match.groups;
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed, so add 1
  //   if (year < currentYear || (year == currentYear && month < currentMonth)) {
  //     alert("Expiration date must not be a past month");
  //     return false;
  //   }
  
  //   return true;
  // }

  // check validation and send data to the database
function sendData(e){
  e.preventDefault(); 

  // if(validateForm){

  const newPayment ={
      email,
      name,
      amount,
      date,
      cardNo,
      expDate,
      cvc,
      pStatus

  }

  axios.post("http://localhost:4001/payment/add",newPayment).then(()=>{
    alert("Payment infromation added")
    setEmail("")
    setName("");
    setAmount("");
    setDate("");
    setCardNo("");
    setExpDate("");
    setCvc("");
    setPstatus("");


    }).catch((err)=>{
      alert(err)
  })}


    return(
      <div className="container" style={{justifyContent: "center"}}>
        <h2>Order Details</h2>
        <div class="form-group" style={{ width: "400px", height: "50px", marginBottom: "50px", boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)", backgroundColor: "lightblue", margin:"auto", width:"50%"}}>
        <label for="date">Date:<br></br></label>
        <input type="date" class="form-control" style={{height:"60px", textAlign:"center"}}   onChange={(e)=>{

        setDate(e.target.value);
         }}/>


        </div>
<br></br>
<br></br>
        <div class="form-group" style={{ width: "400px", height: "50px", marginBottom: "50px", boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)", backgroundColor: "green", margin:"auto", width:"50%"}}>
        <label for="amount" style={{textAlign:"center" , color:"white"}}>Amount:<br></br></label>
          <input type="text" class="form-control" style={{height:"60px", textAlign:"center"}} id="amount"  placeholder="add amount"  onChange={(e)=>{

      setAmount(e.target.value);
          }}/>
        </div>

        <br></br>
<br></br>
        <h2>Confirm Your Order</h2>
        <form onSubmit={sendData}>

        <div class="form-group">
          <label for="email">email:</label>
          <input type="email" class="form-control" id="name"  placeholder="Enter email" onChange={(e)=>{

      setEmail(e.target.value);
          }}/>
        
        </div>
          
        <div class="form-group">
          <label for="name">Name of the Card holder:</label>
          <input type="text" class="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{

      setName(e.target.value);
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
          <input type="text" class="form-control" id="expDate"  placeholder="yy/mm"  onChange={(e)=>{

      setExpDate(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="cvc">CVC:</label>
          <input type="text" class="form-control" id="cvc"  placeholder="111"  onChange={(e)=>{

      setCvc(e.target.value);
          }}/>
        </div>

        <div className="mb-3">
                            <label htmlFor="pStatus">Order Status</label>
                                 <select className="form-select" id="pStatus" value={pStatus} onChange={(e) => setPstatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        
                            </select>
                    </div>
        
        <button type="submit" class="btn btn-primary">PAY</button>
      </form>
      </div>

    
          )


}