import React, { useState, useEffect} from 'react';
import axios from "axios";
import '../../styles/itemStyles.css'

function AllItems() {

    const [items, setItems] = useState([]);
    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [url, setUrl] = useState('')

    //function to display all the items
    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8091/item/").then((res) => {
                setItems(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getItems();
    }, [])

    //function to get one item
    function getOneItem(pid) {
        axios.get("http://localhost:8091/item/get/" + pid).then((res) => {
            setItemID(res.data.item._id);
            setItemName(res.data.item.itemName);
            setItemPrice(res.data.item.itemPrice);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const showUpdateBox = () => {
        document.getElementById('update-box').style.display = "block"
    }

    //Update item function
    function sendData(e) {
        e.preventDefault();
        
        const newItem = {
          itemName,
          itemPrice
        }
        
        const id = itemID;

        axios.put("http://localhost:8091/item/update/"+id, newItem).then(()=>{
          alert("Item Details Updated");
          window.location.reload();
        }).catch((err) =>{
          alert(err)
        })
    
      }

    //delete item function
    function deleteItem(id){
        axios.delete("http://localhost:8091/item/delete/" + id).then((res) => {
            alert('Item Deleted');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <>
         <br></br>
        < div class="container text-center" >
                <div class="row">
                    <h3>Update / Delete Products</h3>
                    <br></br>
                    <br></br>
                    <br></br>
                    {items.map(item => (

                        <div class="col-12 col-md-6 col-lg-4" >
                           
                            <div class="card" style={{ width: "18rem", height: "24rem", marginBottom: "50px", boxShadow: "1px 2px 3px 4px rgba(20,20,20,0.4)"}}>
                                <img src={item.url} style={{ width: "12rem", height: "12rem", margin: '0px auto' }} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    <h6 class="card-title">Item ID: {item._id}</h6>
                                    <h6 class="card-text">Item Name: {item.itemName}</h6>
                                    <h6 class="card-text">Item Price: {item.itemPrice}</h6>
                                    <button type="button" class="btn btn-warning m-3 mt-0 mb-0" onClick={() => {
                                        getOneItem(item._id);
                                        showUpdateBox();
                                    }}>Update</button>
                                    <button type="button" class="btn btn-danger"onClick={() => {
                                        deleteItem(item._id);
                                    }}>Delete</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div >

            <div id="update-box" className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label for="itemID">Item ID</label>
                        <input type="text" class="form-control" id="itemID" value={itemID}
                            disabled />
                    </div>
                    <div className="mb-3">
                        <label for="itemName">Item Name</label>
                        <input type="text" class="form-control" id="itemName" placeholder="Enter Item Name" value={itemName}
                            onChange={(e) => {
                                setItemName(e.target.value);
                            }} />
                    </div>
                    <div className="mb-3">
                        <label for="itemPrice">Item Price</label>
                        <input type="text" class="form-control" id="itemPrice" placeholder="Enter Item Price" value={itemPrice}
                            onChange={(e) => {
                                setItemPrice(e.target.value);
                            }} />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Confirm</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Item</button>
                </form>
            </div>
        </>
    )
}

export default AllItems