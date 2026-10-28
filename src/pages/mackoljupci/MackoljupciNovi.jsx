import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";


export default function MackoljupciNovi() {

    const navigate = useNavigate()

    async function dodaj(mackoljupci){
        await MackoljupciService.dodaj(mackoljupci).then(()=>{
            navigate(RouteNames.MACKOLJUPCI)
        })
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            slika: podaci.get('slika'),
            ime:podaci.get('ime'),
            omiljenamacka: podaci.get('omiljenamacka'),
            
        })
    }


    return (
        <>
            <h3>
                Dodavanje novog mačkoljupca
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