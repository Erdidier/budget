import React, { useState } from "react";
import { withRouter } from "react-router";
import axiosClient from "../config/axios";
import Back from "./Back";
import Error from "./Error";

const Login = ({ setConsult, history }) => {
  // Create state as an object
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Verify error
  const [error, setError] = useState(false);

  // Form Read
  const refreshState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(user);

  // Send req to API
  const LoginUser = (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      setError(true);
      return;
    } else {
      setError(false);
      axiosClient
        .post("/login", user)
        .then((res) => {
          setConsult(true);
          console.log(res.data);
          // const users = res.data;
          // const userFound = users.find(
          //   (u) => u.email === user.email && u.password === user.password
          // );
          // if (userFound) {
          //   history.push("/");
          // } else {
          //   setError(true);
          // }
          if (res.data?.loggedin) {
            history.push("/");
          } else {
            setError(true);
          }

          // Redirect
          //   history.push("/");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h4>Login</h4>
        <Back />
        <form onSubmit={LoginUser}>
          {/* <div className="row">
            <div className="u-full-width">
              <label htmlFor="username-form">Username</label>
              <input
                className="u-full-width"
                type="text"
                placeholder="user"
                id="username-form"
                onChange={refreshState}
                name="username"
              />
            </div>
          </div> */}
          <div className="u-full-width">
            <label htmlFor="email-form">Email</label>
            <input
              className="u-full-width"
              type="email"
              placeholder="example@mail.com"
              id="email-form"
              onChange={refreshState}
              name="email"
            />
          </div>
          <div className="row">
            <div className="u-full-width">
              <label htmlFor="password-form">Password</label>
              <input
                className="u-full-width"
                type="password"
                placeholder="password"
                id="password-form"
                onChange={refreshState}
                name="password"
              />
            </div>
          </div>
          <input
            className="button-primary u-full-width"
            type="submit"
            value="Submit"
          />
        </form>
        {error ? <Error message="All fields are required" /> : null}
      </div>
    </div>
  );
};

export default withRouter(Login);
