import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../state';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function sendData(e) {
    e.preventDefault();

    const newUser = {
      email,
      password
    }

    axios.post("http://localhost:4004/user/login", newUser).then((res) => {
      const user = res.data.user
      const token = res.data.token
      console.log(user)
      dispatch(setCredentials({ user, token }))
      // alert("User Logged in")
      // console.log(res.data.token)
      navigate('/allitems')
    }).catch((err) => {
      alert(err)
    })

  }

  return (
    <>

      <section class="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4">

                      <div class="text-center">
                        <img src="/assets/logo.png"
                          style={{ width: "185px" }} alt="logo" />
                        <h4 class="mt-1 mb-5 pb-1">We are The Herbals Team</h4>
                      </div>

                      <form onSubmit={sendData}>
                        <p>Please login to your account</p>

                        <div class="form-outline mb-4">
                          <input type="email" id="form2Example11" class="form-control" placeholder="email address"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }} />
                          {/* <label class="form-label" for="form2Example11">Username</label> */}
                        </div>

                        <div class="form-outline mb-4">
                          <input type="password" id="form2Example22" class="form-control" placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }} />
                          {/* <label class="form-label" for="form2Example22">Password</label> */}
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button class="btn btn-success" type="submit">Login</button>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <button onClick={() => {
                            navigate('/Signup')
                          }} type="button" class="btn btn-outline-success">Create new</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2" style={{ backgroundColor: '#198754' }}>
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 class="mb-4">We are more than just a company</h4>
                      <p class="small mb-0">Our store is dedicated to providing you with the best possible
                        products to support your health goals. We source our herbs from trusted suppliers and
                        ensure that they are of the highest quality. Whether you're looking for supplements,
                        teas, or other herbal remedies, we have everything you need to support your well-being.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Login;
