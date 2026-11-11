import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";
import { useEffect, useState } from "react";
import MackaService from "../../services/macke/MackaService";


export default function MackoljupciNovi() {

    const navigate = useNavigate()

    const [macke, setMacke] = useState([])

    async function ucitajMacke() {
        await MackaService.get().then((res) => {
            setMacke(res.data)
        })
    }

    useEffect(() => {
        ucitajMacke()
    }, [])


    async function dodaj(mackoljupce) {
        await MackoljupciService.dodaj(mackoljupce).then(() => {
            navigate(RouteNames.MACKOLJUPCI)
        })
    }



    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            //slika: podaci.get('slika'), // u jednom od sljedećih koraka
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            omiljenamacka: parseInt(podaci.get('omiljenamacka')),

        })
    }


    return (
        <>
            <h3>
                Dodavanje novog mačkoljupca
            </h3>

            <Form onSubmit={obradiSubmit}>


                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime"/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime"/>
                </Form.Group>

                <Form.Group controlId="omiljenamacka">
                    <Form.Label>Omiljena mačka</Form.Label>
                    <Form.Select name="omiljenamacka" required>
                        <option value="" key={0}>Odabir omiljene mačke</option>
                        {macke && macke.map((s) => (
                            <option value={s.sifra} key={s.sifra}>
                                {s.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.MACKOLJUPCI}
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