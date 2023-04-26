import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/itemStyles.css'

function DisplayItems() {

    const [items, setItems] = useState([]);
    const [url, setUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    //function to display all the items
    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:4000/item/").then((res) => {
                setItems(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])

    //Search items
    const searchItems = async (e) => {

        e.preventDefault()

        axios.get(`http://localhost:4000/item/search/${searchTerm}`).then((res) => {
            setSearchResults(res.data)
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <>
            <br></br>
            <form className="d-flex" role="search" onSubmit={searchItems}>
                <input className="form-control me-2" type="search" placeholder="Search Products" aria-label="Search" style={{width:"20%"}} 
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} />
            </form>
            <br></br>
            {/* Displaying search items */}
            < div class="container text-center" >
            <div class="row">
            {searchResults.map((item) => (
                
                <div class="card" style={{ width: "18rem", height: "24rem", marginBottom: "50px", marginLeft: "40px" , boxShadow: "0px 0px 10px rgba(0, 80, 0, 0.8)"}}>
                    <img src={item.url} style={{ width: "12rem", height: "14rem", margin: '0px auto'}} class="card-img-top" alt="..."></img>
                    <div class="card-body">
                        {/* <h5 class="card-title">Item ID: {item._id}</h5> */}
                        <h5 class="card-text">Item Name: {item.itemName}</h5>
                        <h6 class="card-text">Item Price: {item.itemPrice}</h6>
                    </div>
                </div>
            ))}
            </div>
            </div>

            {/* Display all items */}
            < div class="container text-center" >
                <h3>HERBALS Products</h3>
                <br></br>
                <div class="row">
                    {items.map(item => (
                        // <div class="col-12 col-md-6 col-lg-4" >
                            <div class="card" style={{ width: "18rem", height: "24rem", marginBottom: "40px", marginLeft: "40px", boxShadow: "0px 0px 10px rgba(0, 80, 0, 0.8)"}}>
                                <img src={item.url} style={{ width: "12rem", height: "14rem", margin: '0px auto'}} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    {/* <h5 class="card-title">Item ID: {item._id}</h5> */}
                                    <h5 class="card-text">Item Name: {item.itemName}</h5>
                                    <h6 class="card-text">Item Price: {item.itemPrice}</h6>
                                </div>
                            </div>
                        // </div>

                    ))}
                </div>
            </div >
        </>
    )
}

export default DisplayItems;