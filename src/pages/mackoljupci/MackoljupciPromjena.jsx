import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";
import { useEffect, useState } from "react";
import MackaService from "../../services/macke/MackaService";

export default function MackoljupciPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [mackoljubac, setMackoljubac] = useState({})
    const [macke, setMacke] = useState([])

    async function ucitajmackoljupci(){
        await MackoljupciService.getBySifra(params.sifra).then((odgovor)=>{
           const s = odgovor.data
           setMackoljubac(s)
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
            //slika: podaci.get('slika'), // ovo je jedan od sljedećih koraka
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            omiljenamacka: parseInt(podaci.get('omiljenamacka')),
        })
    }


    return (
        <>
            <h3>
                Promjena podataka o mačkoljupcima
            </h3>

            <Form onSubmit={obradiSubmit}>

                <img src={mackoljubac.slika} alt={mackoljubac.ime} />


                 <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required 
                    defaultValue={mackoljubac.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required 
                    defaultValue={mackoljubac.prezime}/>
                </Form.Group>


               <Form.Group controlId="omiljenamacka">
                    <Form.Label>Omiljena mačka</Form.Label>
                    <Form.Select name="omiljenamacka" required value={mackoljubac.omiljenamacka || ''} onChange={(e) => setMackoljubac({...mackoljubac, omiljenamacka: parseInt(e.target.value)})}>
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