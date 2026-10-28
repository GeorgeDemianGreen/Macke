import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";
import { useEffect, useState } from "react";


export default function MackoljupciPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [mackoljupci, setmackoljupci] = useState({})

    async function ucitajmackoljupci(){
        await MackoljupciService.getBySifra(params.sifra).then((odgovor)=>{
           const s = odgovor.data
           setmackoljupci(s)
        })
    }

    useEffect(()=>{
        ucitajmackoljupci()
    },[])

    async function promijeni(mackoljupci){
        await MackoljupciService.promijeni(params.sifra, mackoljupci).then(()=>{
            navigate(RouteNames.MACKOLJUPCI)
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
                Promjena podataka o mačkoljupcima
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={mackoljupci.naziv}/>
                </Form.Group>

                 <Form.Group controlId="debljina">
                    <Form.Label>Debljina</Form.Label>
                    <Form.Control type="number" name="debljina" required 
                    defaultValue={mackoljupci.debljina}/>
                </Form.Group>

                <Form.Group controlId="boja">
                    <Form.Label>Boja</Form.Label>
                    <Form.Control type="text" name="boja" required 
                    defaultValue={mackoljupci.boja}/>
                </Form.Group>

                <Form.Group controlId="dlaka">
                    <Form.Label>Dlaka</Form.Label>
                    <Form.Control type="text" name="dlaka" required 
                    defaultValue={mackoljupci.dlaka}/>
                </Form.Group>

                <Form.Group controlId="mazna">
                    <Form.Label>Mazna</Form.Label>
                    <Form.Control type="text" name="mazna" required 
                    defaultValue={mackoljupci.mazna}/>
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
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}