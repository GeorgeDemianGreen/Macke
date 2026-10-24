
import { useEffect, useState } from "react"
import GlasanjeService from "../../services/glasanje/glasanjeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function GlasanjePregled() {

    const [glasanje, setglasanje] = useState([])

    const navigate = useNavigate()

    async function ucitajglasanje() {
        await GlasanjeService.get().then((odgovor) => {
            // console.table(odgovor.data)
            setglasanje(odgovor.data)
        })
    }

    useEffect(() => {
        // console.log('Došao na pregled Glasanja')
        ucitajglasanje()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }

        await GlasanjeService.obrisi(sifra)
        ucitajglasanje()
    }

    // Povećavanje broja glasova za odabranu mačku
    function glasaj(sifra) {
        setglasanje((trenutno) =>
            trenutno.map((macka) =>
                macka.sifra === sifra
                    ? {
                        ...macka,
                        glasanje: Number(macka.glasanje || 0) + 1
                    }
                    : macka
            )
        )
    }

    return (
        <>
          {/*   <Link
                to={RouteNames.MACKE_DODAJ}
                className="btn btn-success w-100 my-3"
            >
                Dodavanje nove mačke
            </Link> */}

            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Slika</th>
                        <th>Naziv</th>
                        <th>Glasanje</th>
                        <th>Glasaj</th>
                        <th>Akcije</th>
                    </tr>
                </thead>

                <tbody>
                    {glasanje && glasanje.map((Glasanje) => (
                        <tr key={Glasanje.sifra}>
                            <td className="lead">
                                <img
                                    src={Glasanje.slika}
                                    alt={Glasanje.naziv}
                                    width="80"
                                    style={{
                                        display: "block",
                                        margin: "0 auto"
                                    }}
                                />
                            </td>

                            <td className="lead">
                                {Glasanje.naziv}
                            </td>

                            <td className="lead">
                                {Glasanje.glasanje}
                            </td>

                            <td>
                                <Button
                                    onClick={() => glasaj(Glasanje.sifra)}
                                    style={{
                                        background: "linear-gradient(135deg, #ff85b3, #ff4f96)",
                                        border: "2px solid #ffb6d2",
                                        borderRadius: "30px",
                                        color: "white",
                                        fontWeight: "bold",
                                        boxShadow: "0 4px 10px #ff85b366"
                                    }}
                                >
                                    ♡ Glasaj 🐾
                                </Button>
                            </td>

                            <td>
                                <Button
                                    onClick={() => {
                                        navigate(`/glasanje/${Glasanje.sifra}`)
                                    }}
                                >
                                    Promjena
                                </Button>

                                {/* <Button
                                    variant="danger"
                                    onClick={() => obrisi(Glasanje.sifra)}
                                >
                                    Obriši
                                </Button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
