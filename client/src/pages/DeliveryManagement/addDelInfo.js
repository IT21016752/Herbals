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
  const [email, setEmail] = useState("");//new
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

  axios.post("http://localhost:4002/delivery/add",newDelivery).then(()=>{
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
const sendEmail=async (e) =>  {
  e.preventDefault();

  const data={
    email
  }
  try {
  const response = await axios.post("http://localhost:4002/api/sendEmail",data)
  console.log(response.data)
  alert("Confirmation email sent successfully!!!.Please check your email");
} catch (error) {
  alert("Error occurred while sending confirmation email.");
  console.error(error);
}
};
    return(
      <div className="container"   >
        <div class="form-style">
        <h1>Add your Delivery Information</h1><br></br>
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
        <input type="text" class="form-control" id="phone"  placeholder="0714839278" pattern="[0-9]{10}" required onChange={(e)=>{
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
        <label for="time">postal code:</label>
          <input type="text" class="form-control" id="time"  placeholder="Ex:20000"  onChange={(e)=>{

      setTime(e.target.value);
          }}/>
        </div>
        <br></br>
        <input type="checkbox" name="terms" required /> <br></br><br></br>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
     <br></br><br></br>
     <div class="form-container">
      <div class="form-style2"  >
      <h2>Send an email confirmation</h2>
      <br></br><br></br><br></br>
      <form onSubmit={sendEmail}>
  <div className="form-group">
    <input type="email" className="form-control" id="email" placeholder="Enter your email here " onChange={(e) => setEmail(e.target.value)} />
  </div><br></br><br></br>

  <button type="submit" className="btn btn-primary">Send Confirmation Email</button>
</form>
      </div>
      </div>
      </div>
          )


}