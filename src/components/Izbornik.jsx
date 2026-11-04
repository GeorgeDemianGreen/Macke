import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IME_APLIKACIJE, RouteNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function Izbornik() {

    const navigate = useNavigate()


    return (
        <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="#home">
                    {IME_APLIKACIJE}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                        onClick={()=>{navigate(RouteNames.HOME)}}
                        onMouseLeave={(e)=>e.currentTarget.blur()}
                        >Početna</Nav.Link>
                        <NavDropdown title="Programi" id="basic-nav-dropdown">

                            <NavDropdown.Item
                            onClick={()=>navigate(RouteNames.MACKE)}
                            onMouseLeave={(e)=>e.currentTarget.blur()}
                            style={{color: '#d66099', fontWeight: 'bold'}}
                            >Mačke</NavDropdown.Item>

                            <NavDropdown.Item
                            onClick={()=>navigate(RouteNames.MACKOLJUPCI)}
                            onMouseLeave={(e)=>e.currentTarget.blur()}
                            style={{color: '#d66099', fontWeight: 'bold'}}
                            >Mačkoljupci</NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={()=>navigate(RouteNames.GENERIRANJE_PODATAKA)}
                                >Generiraj podatke</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}