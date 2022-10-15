import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Main = ({ session }) => {
  return session.user ? (
    <Fragment>
      <h1>Weekly Budget Administrator</h1>
      <div className="container">
        <Link to={"/new"} className="button button-primary add-movement">
          Add Movement
        </Link>
      </div>
    </Fragment>
  ) : (
    <h1>Please Sign Up or Log In</h1>
  );
};

export default Main;
