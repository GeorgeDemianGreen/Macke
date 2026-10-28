import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackaService from "../../services/macke/MackaService";


export default function MackaNovi() {

    const navigate = useNavigate()

    async function dodaj(macka){
        await MackaService.dodaj(macka).then(()=>{
            navigate(RouteNames.MACKE)
        })
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            debljina: parseInt(podaci.get('debljina')),
            boja: podaci.get('boja'),
            dlaka: podaci.get('dlaka'),
            mazna: podaci.get('mazna') 
        })
    }


    return (
        <>
            <h3>
                Dodavanje nove mačke
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="slika">
                    <Form.Label>Slika</Form.Label>
                    <Form.Control type="text" name="slika" required />
                </Form.Group>

                 <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="number" name="ime" step={1} />
                </Form.Group>

                 <Form.Group controlId="omiljenamacka">
                    <Form.Label>Omiljena mačka</Form.Label>
                    <Form.Control type="text" name="omiljenamacka" step={1} />
                </Form.Group>


            
                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.MACKE}
                        className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}