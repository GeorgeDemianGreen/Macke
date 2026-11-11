import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";
import { useEffect, useState } from "react";
import MackaService from "../../services/macke/MackaService";

export default function MackoljupciPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [mackoljupci, setmackoljupci] = useState({})
    const [macke, setMacke] = useState([])

    async function ucitajmackoljupci(){
        await MackoljupciService.getBySifra(params.sifra).then((odgovor)=>{
           const s = odgovor.data
           setmackoljupci(s)
        })
    }

     async function ucitajMacke(){
            await MackaService.get().then((res) => {
                setMacke(res.data)
            } )
        }
        
     useEffect(()=>{
        ucitajMacke()
    },[])


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
            slika: podaci.get('slika'),
            ime: podaci.get('ime'),
            omiljenamacka: podaci.get('omiljenamacka'),
        })
    }


    return (
        <>
            <h3>
                Promjena podataka o mačkoljupcima
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="slika">
                    <Form.Label>Slika</Form.Label>
                    <Form.Control type="text" name="slika" required 
                    defaultValue={mackoljupci.slika}/>
                </Form.Group>

                 <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={mackoljupci.ime}/>
                </Form.Group>

               <Form.Group controlId="macke">
                    <Form.Label>Omiljena mačka</Form.Label>
                    <Form.Select name="macke" required>
                        <option value="" key={0}>Odabir omiljene mačke</option>
                        {macke && macke.map((s)=>(
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
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}