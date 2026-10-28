import { useEffect, useState } from "react"
import MackoljupciService from "../../services/mackoljupci/MackoljupciService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function MackoljupciPregled() {

    const [mackoljupci, setmackoljupci] = useState([])

    const navigate = useNavigate()

    async function ucitajmackoljupci() {
        await MackoljupciService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setmackoljupci(odgovor.data)
        })
    }

    useEffect(() => {
        //console.log('Došao na pregled Mackoljupciova')
        ucitajmackoljupci()
    }, [])


    async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await MackoljupciService.obrisi(sifra)
        ucitajmackoljupci()
    }

    function glasanje(Mackoljupci){
        //console.log(Mackoljupci)
        Mackoljupci.brojGlasova++
        MackoljupciService.promijeni(Mackoljupci.sifra, Mackoljupci)
        ucitajmackoljupci()
    }

    

    return (
        <>
            <Link to={RouteNames.mackoljupci_DODAJ}
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
                    {mackoljupci && mackoljupci.map((Mackoljupci) => (
                        <tr key={Mackoljupci.sifra} className="Mackoljupci-red">
                            <td className="lead">
                                <img src={Mackoljupci.slika} 
                                width="80"
                                style={{ display: "block", margin: "0 auto" }}
                                 />
                            </td>
                            <td>
                                {Mackoljupci.brojGlasova}
                                <p
                                style={{cursor: 'pointer'}}
                                onClick={()=>glasanje(Mackoljupci)}
                                >❤️</p>
                            </td>
                            <td className="lead">
                                {Mackoljupci.naziv}
                            </td>
                            <td className="lead">
                                {Mackoljupci.debljina}
                                </td>
                            <td className="lead">
                                {Mackoljupci.boja}
                                </td>
                            <td className="lead">
                                {Mackoljupci.dlaka}
                                </td>
                             <td className="lead">
                                {Mackoljupci.mazna}
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