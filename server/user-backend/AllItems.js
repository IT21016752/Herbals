import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/itemStyles.css'

function AllItems() {

    const [items, setItems] = useState([]);
    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

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

    //function to get one item
    function getOneItem(pid) {
        axios.get("http://localhost:4000/item/get/" + pid).then((res) => {
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

    //Update function
    function sendData(e) {
        e.preventDefault();
        
        const newItem = {
          itemName,
          itemPrice
        }
        
        const id = itemID;

        axios.put("http://localhost:4000/item/update/"+id, newItem).then(()=>{
          alert("Item Details Updated");
          window.location.reload();
        }).catch((err) =>{
          alert(err)
        })
    
      }

    //delete function
    function deleteItem(id){
        axios.delete("http://localhost:4000/item/delete/" + id).then((res) => {
            alert('Item Deleted');
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
                            <th scope="col">Product ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemPrice}</td>
                                <td>
                                    <button type="button" class="btn btn-success m-3 mt-0 mb-0" onClick={() => {
                                        getOneItem(item._id);
                                        showUpdateBox();
                                    }}>Update</button>
                                    <button type="button" class="btn btn-danger"onClick={() => {
                                        deleteItem(item._id);
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