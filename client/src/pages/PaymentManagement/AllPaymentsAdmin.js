import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/itemStyles.css'

function AllPaymentsAdmin() {

    const [payments, setPayments] = useState([]);
    const [payID, setPayID] = useState('');
    const [email,setEmail]= useState('');
    const [name,setName]= useState('');
    const [amount,setAmount]= useState('');
    const [date,setDate]= useState('');
    const [cardNo,setCardNo]= useState('');
    const [expDate,setExpDate]= useState('');
    const [cvc,setCvc]= useState('');
    const [pStatus,setPstatus]= useState('');

    //function to display all the payments
    useEffect(() => {
        function getPayments() {
            axios.get("http://localhost:4001/payment/").then((res) => {
                setPayments(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPayments();
    }, [])

    //function to get one payment
    function getOnePayment(pid) {
        axios.get("http://localhost:4001/payment/get/" + pid).then((res) => {
            setPayID(res.data.pay._id);
            setEmail(res.data.pay.email);
            setName(res.data.pay.name);
            setAmount(res.data.pay.amount);
            setDate(res.data.pay.date);
            setCardNo(res.data.pay.cardNo);
            setExpDate(res.data.pay.expDate);
            setCvc(res.data.pay.cvc);
            setPstatus(res.data.pay.pStatus);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const showUpdateBox = () => {
        document.getElementById('update-box').style.display = "block"
    }

    //Update function
    function sendData(e) {
        e.preventDefault();
        
        const newPayment = {
            email,
            name,
            amount,
            date,
            cardNo,
            expDate,
            cvc,
            pStatus
        }
        
        const id = payID;

        axios.put("http://localhost:4001/payment/update/"+id, newPayment).then(()=>{
          alert("Payment Details Updated");
          window.location.reload();
        }).catch((err) =>{
          alert(err)
        })
    
      }

    //delete function
    function deletePayment(id){
        axios.delete("http://localhost:4001/payment/delete/" + id).then((res) => {
            alert('Order details Deleted');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <>
            <div class="container shadow rounded">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Payment ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Card No.</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">CVC</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr>
                                <td>{payment._id}</td>
                                <td>{payment.email}</td>
                                <td>{payment.name}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.date}</td>
                                <td>{payment.cardNo}</td>
                                <td>{payment.expDate}</td>
                                <td>{payment.cvc}</td>
                                <td>{payment.pStatus}</td>
                                <td>
                                    <button type="button" class="btn btn-success m-3 mt-0 mb-0" onClick={() => {
                                        getOnePayment(payment._id);
                                        showUpdateBox();
                                    }}>Update</button>
                                    <button type="button" class="btn btn-danger" onClick={() => {
                                        deletePayment(payment._id);
                                    }}>Delete</button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div id="update-box" className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label for="PaymentId">Order ID</label>
                        <input type="text" class="form-control" id="id" value={payID}
                            disabled />
                    </div>
                    <div className="mb-3">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" id="email" value={email}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" value={name}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="amount">Amount</label>
                        <input type="text" class="form-control" id="amount" value={amount}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="date">Ordered Date</label>
                        <input type="text" class="form-control" id="date" value={date}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="cardNo">Card No.</label>
                        <input type="text" class="form-control" id="cardNo" value={cardNo}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="expDate">Expiry Date</label>
                        <input type="text" class="form-control" id="expDate" value={expDate}
                            disabled />
                    </div>

                    <div className="mb-3">
                        <label for="cvc">CVC</label>
                        <input type="text" class="form-control" id="cvc" value={cvc}
                            disabled />
                    </div>

                    <div className="mb-3">
                            <label htmlFor="pStatus">Order Status</label>
                                 <select className="form-select" id="pStatus" value={pStatus} onChange={(e) => setPstatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Accepted</option>
                                        <option value="Canceled">Canceled</option>
                            </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Item</button>
                </form>
            </div>
        </>
    )
}

export default AllPaymentsAdmin

