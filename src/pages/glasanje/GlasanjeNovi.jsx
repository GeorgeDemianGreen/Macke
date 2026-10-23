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

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                 <Form.Group controlId="debljina">
                    <Form.Label>Debljina</Form.Label>
                    <Form.Control type="number" name="debljina" step={1} />
                </Form.Group>

                 <Form.Group controlId="boja">
                    <Form.Label>Boja</Form.Label>
                    <Form.Control type="text" name="boja" step={1} />
                </Form.Group>

                 <Form.Group controlId="dlaka">
                    <Form.Label>Dlaka</Form.Label>
                    <Form.Control type="text" name="dlaka" step={1} />
                </Form.Group>

                 <Form.Group controlId="mazna">
                    <Form.Label>Mazna</Form.Label>
                    <Form.Control type="text" name="mazna" step={1} />
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