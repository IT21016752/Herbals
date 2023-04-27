import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/itemStyles.css';

function AllDelInfo() {

  const [delivery, setDelivery] = useState([]);
  const [id, setid] = useState('');
  const [uid, setuid] = useState('');
  const [contactName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    function getDeliveryinfo() {
      axios.get("http://localhost:4002/delivery/").then((res) => {
        setDelivery(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getDeliveryinfo();
  }, [])

  useEffect(() => {
    function getDriverinfo() {
      axios.get("http://localhost:4002/Driver/").then((res) => {
        setDrivers(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getDriverinfo();
  }, [])
  //   useEffect(() => {
  //     function getDriverinfo() {
  //     axios.get("http://localhost:4002/Driver/")///////////////////////////
  //       .then(res => {
  //         setDrivers(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }, []);

  //function to get one item
  function getOneItem(did) {
    axios.get("http://localhost:4002/delivery/get/" + did).then((res) => {
      setid(res.data.deli._id);
      setuid(res.data.deli.uid);
      setName(res.data.deli.contactName);
      setAddress(res.data.deli.address);
      setProvince(res.data.deli.province);
      setPhone(res.data.deli.phone);
      setPrice(res.data.deli.price);
      setTime(res.data.deli.time);
    }).catch((err) => {
      alert(err.message);
    })
  }
  const showUpdateBox = () => {

    document.getElementById('backdrop').style.display = "block"

  }




  const handleClose = () => {

    document.getElementById('backdrop').style.display = "none"

  }
  //Update function
  function sendData(e) {
    e.preventDefault();
    const newDelivery = {
      uid,
      contactName,
      address,
      province,
      phone,
      price,
      time,
      driver: selectedDriver
    }
    const ID = id;
    axios.put("http://localhost:4002/delivery/update/" + ID, newDelivery).then(() => {
      alert("Delivery Details Updated");
      window.location.reload();
    }).catch((err) => {
      alert(err)
    })
  }

  //delete function
  function deleteItem(ID) {
    axios.delete("http://localhost:4002/delivery/delete/" + ID).then((res) => {
      alert('Delivery Information Deleted');
      window.location.reload();
    }).catch((err) => {
      alert(err.message);
    })
  }

  return (
    <>
      <div className="container shadow rounded">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">UID</th>
              <th scope="col">ContactName</th>
              <th scope="col">Address</th>
              <th scope="col">Province</th>
              <th scope="col">Phone</th>
              <th scope="col">Price</th>
              <th scope="col">Postal code</th>
              <th scope="col"></th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            {delivery.map(delivery => (
              <tr key={delivery._id}>
                <td>{delivery._id}</td>
                <td>{delivery.uid}</td>
                <td>{delivery.contactName}</td>
                <td>{delivery.address}</td>
                <td>{delivery.province}</td>
                <td>{delivery.phone}</td>
                <td>{delivery.price}</td>
                <td>{delivery.time}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => { getOneItem(delivery._id); showUpdateBox(); }}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteItem(delivery._id)}>Delete</button>
                </td>
                <td>
                  <select className="form-select" onChange={(e) => setSelectedDriver(e.target.value)}>
                    <option value="">Select Driver</option>
                    {drivers.map(driver => (
                      <option key={driver._id} value={driver._id}>{driver._id}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="backdrop" className='backdrop-black'>

        <div id="update-box" className="container form-style">

          <button onClick={handleClose} className='btn btn-outline-danger' style={{ width: '40px', height: '40px', float: 'right' }}>X</button>

          <br></br>

          <br></br>
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">Contact Name</label>
              <input type="text" className="form-control" id="contactName" placeholder="Enter Contact Name" value={contactName} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="province" className="form-label">Province</label>
              <input type="text" className="form-control" id="province" placeholder="Enter Province" value={province} onChange={(e) => setProvince(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className="form-control" id="price" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>a
            <div className="mb-3">
              <label htmlFor="time" className="form-label">Postal code</label>
              <input type="text" className="form-control" id="time" placeholder="Enter Time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="checkbox" name="terms" required /> <br></br><br></br>
              <button type="submit" className="btn btn-primary">Update Delivery Details</button>
            </div>
          </form>
        </div>
        </div>
      </>
      )
}

      export default AllDelInfo;






