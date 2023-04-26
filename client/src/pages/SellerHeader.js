import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{ color: "white" }}>HERBALS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                {/* <a className="nav-link active text-white" aria-current="page" href="/allitems">Home</a>*/}
                                <Link to="/allitems" className="nav-link active text-white"> Home </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                </a>
                                <ul className="dropdown-menu text-white">
                                    {/*<li><a className="dropdown-item" href="/additems">Add Item</a>*/}
                                    <li> <Link to="/additems" className="nav-link active"> Add New Item </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {/* <li><a className="dropdown-item" href="/AddDelInfo">Delivery </a></li> */}
                                    <li><a className="dropdown-item" href="/AllDelInfo">View All Delivery  info(Admin)</a></li>

                                    <li><hr className="dropdown-divider" /></li>
                                    {/* <li><a className="dropdown-item" href="/AddPayInfo">Payment</a></li> */}
                                    <li><a className="dropdown-item" href="/AllPayments">View Payment Info</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                        <form className="d-flex">
                            <button onClick={() => {
                                navigate('/LandingPage')
                            }} className="btn btn-light" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            <Outlet>

            </Outlet>
        </>
    )
}

export default Header;