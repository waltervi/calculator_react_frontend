import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Switch, Route ,Redirect } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import CalculatorView from "./CalculatorView";
import UseRecords from "./UseRecords";
import { User } from "../network/types";

import NavDropdown from 'react-bootstrap/NavDropdown';
interface MainPageProps {
  setUserLoggedIn: (value: User|null) => void;
  userLoggedIn: User;
}



function MainPage(props: MainPageProps) {
  console.log("props.userLoggedIn",props.userLoggedIn)
  return (
     
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link className="me-auto">
              <Link to="/calculator"><h5>Calculator</h5></Link>
            </Nav.Link>
            <Nav className="me-auto">
              <Link to="/user_records"><h5>User records</h5></Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Navbar.Text>
            <h5>Signed in as: <a href="#login">{props.userLoggedIn.userName}</a></h5>
            </Navbar.Text>
            <Nav.Link onClick={() => props.setUserLoggedIn(null)}><h5>Logout</h5></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return props.userLoggedIn ? <Redirect to="/login" /> : <Redirect to="/calculator" />;
          }}
        />
        <Route path="/calculator">
          <CalculatorView userLoggedIn={props.userLoggedIn} />
        </Route>
        <Route path="/user_records">
          <UseRecords />
        </Route>
        <Route path="/login">
          <UseRecords />
        </Route>
        <Route path="/register">
          <UseRecords />
        </Route>
      </Switch>
    </>
  );
}

export default MainPage;
