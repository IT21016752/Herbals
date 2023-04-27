import React,{useState} from "react"
import axios from "axios";

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

function sendData(e){
  e.preventDefault(); 

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
  })
}

    return(
      <div className="container">
        <h2>Order Details</h2>
        <div class="form-group" style={{ width: "400px", height: "50px", marginBottom: "50px", boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)", backgroundColor: "lightblue"}}>
        <label for="date">Date:<br></br></label>
        <input type="date" class="form-control" style={{height:"60px", textAlign:"center"}}   onChange={(e)=>{

        setDate(e.target.value);
         }}/>


        </div>


        <div class="form-group" style={{ width: "400px", height: "50px", marginBottom: "50px", boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)", backgroundColor: "green"}}>
        <label for="amount" style={{textAlign:"center" , color:"white"}}>Amount:<br></br></label>
          <input type="text" class="form-control" style={{height:"60px", textAlign:"center"}} id="amount"  placeholder="add amount"  onChange={(e)=>{

      setAmount(e.target.value);
          }}/>
        </div>


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