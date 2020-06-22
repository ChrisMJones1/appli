import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";


//---------- SUSAN'S COMPONENTS ----------//
import AboutComponent from "./components/about.component";
import ContactUsComponent from "./components/contactus_component";

import AddJobAppComponent from "./components/jobapp/add-jobapp.component";
import ListJobAppComponent from "./components/jobapp/list-jobapp.component";
import UpdateJobAppComponent from "./components/jobapp/update-jobapp.component";
import ShowJobAppComponent from "./components/jobapp/show-jobapp.component";

import AddNetworkingComponent from "./components/networking-events/add-networking.component";
import ListNetworkingComponent from "./components/networking-events/list-networking.component";
import UpdateNetworkingComponent from "./components/networking-events/update-networking.component";
// import ShowNetworkingComponent from "./components/networking-events/show-networking.component";

import AddContactsComponent from "./components/contacts/add-contacts.component";
import ListContactsComponent from "./components/contacts/list-contacts.component";
import UpdateContactsComponent from "./components/contacts/update-contact.component";
import ShowContactsComponent from "./components/contacts/show-contact.component";


//---------- SAM'S COMPONENTS ----------//
import NetworkingHomeComponent from "./components/networking-events/networking-home.component";
import MyNetworkingEventsComponenet from "./components/networking-events/my-events-list.component";
import PublicNetworkingEventsComponenet from "./components/networking-events/public-events-list.component";
import UpdateNetworkingComponenet from "./components/networking-events/update-networking.component";
import DetailsNetworkingComponenet from "./components/networking-events/details-networking.component";
import HomeComponent from "./components/home.component";


//---------- MAEDA'S COMPONENTS ----------//
import CalendarComponent from "./components/calendar/calendar.component";

//---------- PAUL'S COMPONENTS ----------//


//---------- JONES' COMPONENTS ----------//
import DataVizHomeComponent from "./components/data-viz/dataviz-home.component";
import { ResponsiveCalendarCanvas  } from '@nivo/calendar';
import CalendarVizHomeComponent from "./components/data-viz/calendarviz-home.component";
import GraphVizHomeComponent from "./components/data-viz/graphviz-home.component";

//---------- OSWALDO'S COMPONENTS ----------//
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard.component";

//-----Checking for logged-in user--------//
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decode = jwt_decode(token);
  store.dispatch(setCurrentUser(decode));

  //check for expired
  const currentTime = Date.now() / 1000
  if (decode.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href ="./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand">
                    <img src="/images/logo_appli_v2.png" width="100%" height="auto" alt="Appli Logo" />
                </Link>
              {/*<Link to="/" className="navbar-brand">Appli</Link>*/}
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="navbar-item">
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/jobapp/1" className="nav-link">Job Applications</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/networking-events" className="nav-link">Networking Events</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/calendar" className="nav-link">Calendar</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/data-viz" className="nav-link">Data Visualization</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/contacts" className="nav-link">Connections</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/contactus" className="nav-link">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>


            {/* ---------- NAVIGATION ROUTES ---------- */}
              <Route path="/" exact component={HomeComponent} />
              <Route path="/about" component={AboutComponent} />
              <Route path="/contactus" component={ContactUsComponent} />


             {/* ---------- SUSAN'S ROUTES ---------- */}
              <Route path="/jobapp/:pageIndex" exact component={ListJobAppComponent} />
              <Route path="/jobapp/add" exact component={AddJobAppComponent} />
              <Route path="/jobapp/update/:id" exact component={UpdateJobAppComponent} />
              <Route path="/jobapp/show/:id" exact component={ShowJobAppComponent} />

              <Route path="/contacts" exact component={ListContactsComponent} />
              <Route path="/contacts/add" exact component={AddContactsComponent} />
              <Route path="/contacts/update/:id" exact component={UpdateContactsComponent} />
              <Route path="/contacts/show/:id" exact component={ShowContactsComponent} />

              {/*<Route path="/networking-events" exact component={NetworkingHomeComponent} />*/}
              <Route path="/networking-events/add" exact component={AddNetworkingComponent} />
              <Route path="/networking-events/update/:id" exact component={UpdateNetworkingComponent} />


             {/* ---------- SAM'S ROUTES ---------- */}
              {/*Note for Sam: I've have list, add, and update routes in the code block above this note*/}
              <Route path="/networking-events" exact component={NetworkingHomeComponent} />
              <Route path="/networking-events/my-events" exact component={MyNetworkingEventsComponenet} />
              <Route path="/networking-events/public-events" exact component={PublicNetworkingEventsComponenet} />
              <Route path="/networking-events/details/:id" exact component={DetailsNetworkingComponenet} />


             {/* ---------- MAEDA'S ROUTES ---------- */}
              <Route path="/calendar" exact component={CalendarComponent} />

             {/* ---------- PAUL'S ROUTES ---------- */}


             {/* ---------- JONES' ROUTES ---------- */}

            <Switch>
              <Route path="/data-viz" component={DataVizHomeComponent} />
              <Route path="/data-viz/calendarview"  component={CalendarVizHomeComponent} />
              <Route path="/data-viz/graphview"  component={GraphVizHomeComponent} />
            </Switch>

             {/* ---------- OSWALDO'S ROUTES ---------- */}
             <Route path="/user" exact component={CreateUser}/>
             <Route path="/login" exact component={Login}/>
             <Switch>
               <PrivateRoute path="/dashboard" exact component={Dashboard}/>
             </Switch>

        </div>
        <footer>
          <p>&copy;Appli2020</p>
        </footer>

      </Router>
      </Provider>
    );
  }
}

export default App;