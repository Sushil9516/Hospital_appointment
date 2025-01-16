import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import Register from "./components/Register";
import Login from "./components/Login";
import Users from "./components/Users.js";
import AppointmentList from "./components/AppointmentList.js";
const App = () => {
  return (
    <div className="home-container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users" component={Users} />
          <Route path="/bookAppointment" component={BookAppointment} />
          <Route path="/appointments" component={AppointmentList} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
