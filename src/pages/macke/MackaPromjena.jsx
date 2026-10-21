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
            naziv: podaci.get('naziv')
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