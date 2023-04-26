import React,{useState} from "react"
import axios from "axios";

export default function AddDeliveryInfo(){

  const [uid,setuid]= useState("");
  const [contactName,setName]= useState("");
  const [address,setAddress]= useState("");
  const [province,setProvince]= useState("");
  const [phone,setPhone]= useState("");
  const [price,setPrice]= useState("");
  const [time,setTime]= useState("");

function sendData(e){
  e.preventDefault(); 

  const newDelivery ={
    uid,
    contactName,
    address,
    province,
    phone,
    price,
    time,

  }

  axios.post("http://localhost:8091/delivery/add",newDelivery).then(()=>{
    alert("delivery infromation added")
    setuid("");
    setName("");
    setAddress("");
    setProvince("");
    setPhone("");
    setPrice("");
    setTime("");
    }).catch((err)=>{
    alert(err)
  })
}

    return(
      <div className="container">
        <form onSubmit={sendData}>
        <div class="form-group">
          <label for="uid">UID:</label>
          <input type="text" class="form-control" id="uid"  placeholder="Enter user id" onChange={(e)=>{

      setuid(e.target.value);
          }}/>
          </div>
          
        <div class="form-group">
          <label for="contactName">Contact name:</label>
          <input type="text" class="form-control" id="contactName"  placeholder="Enter Contact name" onChange={(e)=>{

      setName(e.target.value);
          }}/>
        
        </div>
        <div class="form-group">
        <label for="address">Address:</label>
          <input type="text" class="form-control" id="address"  placeholder="34/123 nobel place ,kamdy"  onChange={(e)=>{

      setAddress(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="province">Province:</label>
          <input type="text" class="form-control" id="province"  placeholder="Ex:Central"onChange={(e)=>{

      setProvince(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="phone">Phone:</label>
          <input type="text" class="form-control" id="phone"  placeholder="+94 754236541"  onChange={(e)=>{

      setPhone(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="price">Price:</label>
          <input type="text" class="form-control" id="price"  placeholder="Rs:2000 /-"  onChange={(e)=>{

      setPrice(e.target.value);
          }}/>
        </div>
        <div class="form-group">
        <label for="time">Time:</label>
          <input type="text" class="form-control" id="time"  placeholder="tt"  onChange={(e)=>{

      setTime(e.target.value);
          }}/>
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
          )


}