import { useEffect, useState } from "react"
import MackaService from "../../services/macke/MackaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function MackaPregled() {

    const [macke, setMacke] = useState([])

    const navigate = useNavigate()

    async function ucitajMacke() {
        await MackaService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setMacke(odgovor.data)
        })
    }

    useEffect(() => {
        //console.log('Došao na pregled mackaova')
        ucitajMacke()
    }, [])


    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await MackaService.obrisi(sifra)
        ucitajMacke()
    }

    

    return (
        <>
            <Link to={RouteNames.MACKE_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje novog mačke
            </Link>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {macke && macke.map((macka) => (
                        <tr key={macka.sifra}>
                            <td className="lead">
                                {macka.naziv}
                            </td>
                            <td>
                                <Button onClick={()=>{navigate(`/macke/${macka.sifra}`)}}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={()=>obrisi(macka.sifra)}>
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