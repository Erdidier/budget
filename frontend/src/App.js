import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosClient from "./config/axios";

// Comps
import Form from "./components/Form";
import Table from "./components/Table";
import Main from "./components/Main";
import EditForm from "./components/EditForm";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  // App State
  const [session, setSession] = useState({});
  const [movements, setMovements] = useState([]);
  const [consult, setConsult] = useState(true);

  useEffect(() => {
    if (consult) {
      const getSession = () => {
        axiosClient
          .get("/logged")
          .then((res) => {
            setSession(res.data);
            setConsult(false);
          })
          .catch((error) => console.log(error));
        // setSession(movements.data);
        // setConsult(false);
      };
      getSession();
    }
  }, [consult]);

  useEffect(() => {
    if (session.userId) {
      const consultAPI = () => {
        // axiosClient
        //   .get("/movements")
        //   .then((res) => {
        //     setMovements(res.data);
        //     setConsult(false);
        //   })
        //   .catch((error) => console.log(error));
        axiosClient
          .get(`/movements/user/${session.userId}`)
          .then((res) => {
            setMovements(res.data);
          })
          .catch((error) => console.log(error));
      };

      consultAPI();
    }
  }, [session]);

  return (
    <Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Fragment>
                <Main session={session} />
                <Table movements={movements} setConsult={setConsult} />
              </Fragment>
            )}
          />

          <Route
            exact
            path="/new"
            component={() => <Form setConsult={setConsult} />}
          />

          <Route
            exact
            path="/movement/:id"
            render={(props) => {
              const movement = movements.filter(
                (movement) => movement.id === Number(props.match.params.id)
              );

              return <EditForm mov={movement[0]} setConsult={setConsult} />;
            }}
          />

          <Route
            exact
            path="/register"
            component={() => <Register setConsult={setConsult} />}
          />
          <Route
            exact
            path="/login"
            component={() => <Login setConsult={setConsult} />}
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
