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
                        <form className="d-flex">
                            <button onClick={() => {
                                navigate('/Login')
                            }} className="btn btn-light" type="submit">Signup / Login</button>
                        </form>
                    </div>
            </nav>
            <Outlet>

            </Outlet>
        </>
    )
}

export default Header;