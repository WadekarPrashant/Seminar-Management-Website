import React from 'react';
import { Link } from "react-router-dom";

import './Navbar.css';

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="https://www.iaccindia.com/wp-content/uploads/2018/10/Final-MIT-WPU-logo-page-001.jpg" alt="MIT-WPU logo" width="150" height="50" className="d-inline-block align-text-top me-2" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">MIT-WPU</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prelogin">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/presignup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/review">Review</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/guidereview">Guide Review</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}