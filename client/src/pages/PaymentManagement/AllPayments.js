import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/itemStyles.css'

function AllPayments() {

    const [payments, setPayments] = useState([]);
    const [payID, setPayID] = useState('');
    const [userId,setuserId]= useState('');
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
            axios.get("http://localhost:8091/payment/").then((res) => {
                setPayments(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPayments();
    }, [])

    //function to get one payment
    function getOnePayment(pid) {
        axios.get("http://localhost:8091/payment/get/" + pid).then((res) => {
            setPayID(res.data.payment._id);
            setuserId(res.data.payment.userId);
            setName(res.data.payment.name);
            setAmount(res.data.payment.amount);
            setDate(res.data.payment.date);
            setCardNo(res.data.payment.cardNo);
            setExpDate(res.data.payment.expDate);
            setCvc(res.data.payment.cvc);
            setPstatus(res.data.payment.pStatus);
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
            userId,
            name,
            amount,
            date,
            cardNo,
            expDate,
            cvc,
            pStatus
        }
        
        const id = payID;

        axios.put("http://localhost:8091/payment/update/"+id, newPayment).then(()=>{
          alert("Payment Details Updated");
          window.location.reload();
        }).catch((err) =>{
          alert(err)
        })
    
      }

    //delete function
    function deletePayment(id){
        axios.delete("http://localhost:8091/payment/delete/" + id).then((res) => {
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
                            <th scope="col">User ID</th>
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
                                <td>{payment.userId}</td>
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
                                    <button type="button" class="btn btn-danger"onClick={() => {
                                        deletePayment(payment._id);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllPayments