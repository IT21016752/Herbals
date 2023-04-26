import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate("")

    return (
        <>
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
                                            <p>We are here for your herbal products</p>
                                            <button onClick={() => {
                                                navigate('/ExploreItems')
                                            }} class="btn btn-outline-success" type="submit">Explore Our Products</button>

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
        </>

    )
}

export default LandingPage
