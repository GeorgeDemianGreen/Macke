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

    function glasanje(macka){
        //console.log(macka)
        macka.brojGlasova++
        MackaService.promijeni(macka.sifra, macka)
        ucitajMacke()
    }

    

    return (
        <>
            <Link to={RouteNames.MACKE_DODAJ}
            className="btn btn-success w-100 my-3">
                Dodavanje nove mačke
            </Link>
            {/* <Table hover striped bordered> */}
            <Table
            hover
            bordered
            style={{
            backgroundColor: "#581831"
    }}
>
                <thead>
                    <tr>
                        <th>Slika</th>
                        <th>Broj glasova</th>
                        <th>Naziv</th>
                        <th>Debljina</th>
                        <th>Boja</th>
                        <th>Dlaka</th>
                        <th>Mazna</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody> 
                    {macke && macke.map((macka) => (
                        <tr key={macka.sifra} className="macka-red">
                            <td className="lead">
                                <img src={macka.slika} 
                                width="80"
                                style={{ display: "block", margin: "0 auto" }}
                                 />
                            </td>
                            <td>
                                {macka.brojGlasova}
                                <p
                                style={{cursor: 'pointer'}}
                                onClick={()=>glasanje(macka)}
                                >❤️</p>
                            </td>
                            <td className="lead">
                                {macka.naziv}
                            </td>
                            <td className="lead">
                                {macka.debljina}
                                </td>
                            <td className="lead">
                                {macka.boja}
                                </td>
                            <td className="lead">
                                {macka.dlaka}
                                </td>
                             <td className="lead">
                                {macka.mazna}
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