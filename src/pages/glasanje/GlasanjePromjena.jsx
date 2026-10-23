import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackaService from "../../services/macke/MackaService";
import { useEffect, useState } from "react";


export default function MackaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [macka, setMacka] = useState({})

    async function ucitajMacka(){
        await MackaService.getBySifra(params.sifra).then((odgovor)=>{
           const s = odgovor.data
           setMacka(s)
        })
    }

    useEffect(()=>{
        ucitajMacka()
    },[])

    async function promijeni(macka){
        await MackaService.promijeni(params.sifra, macka).then(()=>{
            navigate(RouteNames.MACKE)
        })
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        promijeni({
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
                Promjena podatke o mački
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={macka.naziv}/>
                </Form.Group>

                 <Form.Group controlId="debljina">
                    <Form.Label>Debljina</Form.Label>
                    <Form.Control type="number" name="debljina" required 
                    defaultValue={macka.debljina}/>
                </Form.Group>

                <Form.Group controlId="boja">
                    <Form.Label>Boja</Form.Label>
                    <Form.Control type="text" name="boja" required 
                    defaultValue={macka.boja}/>
                </Form.Group>

                <Form.Group controlId="dlaka">
                    <Form.Label>Dlaka</Form.Label>
                    <Form.Control type="text" name="dlaka" required 
                    defaultValue={macka.dlaka}/>
                </Form.Group>

                <Form.Group controlId="mazna">
                    <Form.Label>Mazna</Form.Label>
                    <Form.Control type="text" name="mazna" required 
                    defaultValue={macka.mazna}/>
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
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}