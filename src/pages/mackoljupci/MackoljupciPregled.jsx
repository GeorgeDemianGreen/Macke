import { useEffect, useState } from "react"
import MackoljupciService from "../../services/mackoljupci/MackoljupciService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import MackaService from "../../services/macke/MackaService"

export default function MackoljupciPregled() {

    const [mackoljupci, setmackoljupci] = useState([])
    const [macke, setmacke] = useState([])  
    const navigate = useNavigate()

    async function ucitajmackoljupci() {
        await MackoljupciService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setmackoljupci(odgovor.data)
        })
    }

    async function ucitajMacke() {
        await MackaService.get().then((o) => {
            // console.table(odgovor.data)
            setmacke(o.data)
        })
    }


    useEffect(() => {
        //console.log('Dobrodošao na pregled Mackoljubaca')
        ucitajmackoljupci()
        ucitajMacke()
    }, [])


    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await MackoljupciService.obrisi(sifra)
        ucitajmackoljupci()
    }

    function dohvatiNazivMacke(sifraMacke) {
    const macka = macke.find(s => s.sifra === sifraMacke)
    return macka.naziv
}


    

    return (
        <>
            <Link to={RouteNames.MACKOLJUPCI_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje novog mačkoljupca
            </Link>
            {/* <Table hover striped bordered> */}
            <Table
            hover
            bordered
>
                <thead>
                    <tr>
                        <th>Slika</th>
                        <th>Ime</th>
                        <th>Omiljena mačka</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody> 
                    {mackoljupci && mackoljupci.map((Mackoljupci) => (
                        <tr key={Mackoljupci.sifra} className="Mackoljupci-red">
                            <td className="lead">
                                <img src={Mackoljupci.slika} 
                                width="80"
                                style={{ display: "block", margin: "0 auto" }}
                                 />
                            </td>
                            <td className="lead">
                                {Mackoljupci.ime}
                            </td>
                            <td>
                                  {dohvatiNazivMacke(mackoljupci.macke)}
                            </td>
                            <td className="lead">
                                {Mackoljupci.omiljenamacka}
                                </td>
                            <td>
                                <Button onClick={()=>{navigate(`/mackoljupci/${Mackoljupci.sifra}`)}}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(Mackoljupci.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}