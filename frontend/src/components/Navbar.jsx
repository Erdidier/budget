import React, { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import "./Navbar.css";

const openDrawerMenu = () => {
  var x = document.getElementById("mainNavBar");
  if (x.className === "navBar") {
    x.className += " responsive";
  } else {
    x.className = "navBar";
  }
};

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axiosClient.get("/logged").then((res) => {
      if (res.data.loggedin) {
        setUsername(res.data.username);
      }
    });
  }, []);
  return (
    <div className="navBar" id="mainNavBar">
      <a href="/">Home</a>
      <a href="/register">Register</a>
      <a href="/login">Log in</a>
      <a href="#contact">Contact</a>
      {username != "" && <p className="username">{username}</p>}
      <a href="javascript:void(0);" className="icon" onClick={openDrawerMenu}>
        &#9776;
      </a>
      {/* <!--&#9776; is the code for the 3 line menu button--> */}
      <br />
    </div>
  );
};

export default Navbar;
