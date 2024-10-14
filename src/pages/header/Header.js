import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav"
import { Link, NavLink } from "react-router-dom";
import "./Header.css"

const Header = () =>{
    return (
        <Navbar bg ="primary" variant="dark">
            <Container>
                <Navbar.Brand to="/"><strong>Employee Management System</strong>
                <Nav className="ml-auto">
                <NavLink as={Link} to="/" className="nav-link">Employee</NavLink>
                <NavLink as={Link} to="/addemployee" className="nav-link">Add Employee</NavLink>
                </Nav>
                </Navbar.Brand>
            </Container>
         </Navbar>
    )
}

export default Header;
