import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-2">
      <Container>
        <Nav className="me-auto">
          <Navbar.Brand href="#home">Gestion de inventario</Navbar.Brand>
          <Nav.Link>
            <Link to="/">Inicio</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/Vender">Vender</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/Facturar">Facturar</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/Editar">Editar</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
