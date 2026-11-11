import { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { Faker, fakerTR, hr } from '@faker-js/faker';
import MackaService from '../services/macke/MackaService';
import MackoljupciService from '../services/mackoljupci/MackoljupciService';



export default function GeneriranjePodataka() {
    const [brojMacaka, setBrojMacaka] = useState(5);
    const [BrojMackoljubaca, setBrojMackoljubaca] = useState(20);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    // Postavi faker na hrvatski jezik
    const faker = new Faker({
        locale: [hr]
    });

    const generirajMacke = async (broj) => {
        const naziviMacaka = [
            'Bobica',
            'Dušica',
            'Anđelka',
            'Obraščić',
            'Duda',
            'Mini',
            'Miško',
            'Barica',
            'Kikica',
            'Ružica',
            'Popi',
            'Slavica',
            'Đurđa',
            'Đedo',
            'Milica'
        ];

        for (let i = 0; i < broj; i++) {
            await MackaService.dodaj({
                slika: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
                naziv: naziviMacaka[i % naziviMacaka.length] + (i >= naziviMacaka.length ? ` ${Math.floor(i / naziviMacaka.length) + 1}` : ''),
                debljina: faker.number.int({min: 3, max: 8}),
                boja: 'Crna', 
                dlaka: 'Duga', 
                mazna: 'Veoma', 
                brojGlasova: 0,

            });
        }
    };

    const generirajMackoljupce = async (broj) => {
        for (let i = 0; i < broj; i++) {
            const mackoljupci = {
                ime: i%2===0? faker.person.firstName('male') : faker.person.firstName('female'),
                slika: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
                prezime: faker.person.lastName(),
                omiljenamacka: 1 // ovo možda kasnije uzeti slučajnu prethodno kreiranu mačku - vidi generianje grupe kako se radi s smjerom
            };
            await MackoljupciService.dodaj(mackoljupci);
        }
    };

    const generirajGrupe = async (broj) => {

        // Dohvati sve Macke
        const rezultatMacke = await MackaService.get();
        const Macke = rezultatMacke.data;

        
        if (Macke.length === 0) {
            throw new Error('Nema dostupnih Macaka. Prvo generirajte Macke.');
        }
        
        for (let i = 0; i < broj; i++) {
            // Odaberi nasumični Macka
            const randomMacka = Macke[faker.number.int({ min: 0, max: Macke.length - 1 })];
  
            const grupa = {
                naziv: randomMacka.naziv.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase(),   
                Macka: randomMacka.sifra
            };
            
            await GrupaService.dodaj(grupa);
        }
    };

    const handleGenerirajMacke = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajMacke(brojMacaka);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojMacaka} Macaka!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju Macaka: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajMackoljupce = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            
            await generirajMackoljupce(BrojMackoljubaca);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${BrojMackoljubaca} mackoljubaca!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju mackoljubaca: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiMackoljupce = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve mackoljupce?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await MackoljupciService.get();
            const mackoljupci = rezultat.data;
            
            for (const mackoljubac of mackoljupci) {
                await MackoljupciService.obrisi(mackoljubac.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${mackoljupci.length} mackoljubaca!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju mackoljubaca: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleObrisiMacke = async () => {
        if (!window.confirm('Jeste li sigurni da želite obrisati sve Macke?')) {
            return;
        }

        setLoading(true);
        setPoruka(null);

        try {
            const rezultat = await MackaService.get();
            const Macke = rezultat.data;
            
            for (const Macka of Macke) {
                await MackaService.obrisi(Macka.sifra);
            }

            setPoruka({
                tip: 'success',
                tekst: `Uspješno obrisano ${Macke.length} Macaka!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri brisanju Macaka: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGenerirajGrupe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPoruka(null);

        try {
            await generirajGrupe(brojGrupa);

            setPoruka({
                tip: 'success',
                tekst: `Uspješno generirano ${brojGrupa} grupa!`
            });
        } catch (error) {
            setPoruka({
                tip: 'danger',
                tekst: 'Greška pri generiranju grupa: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Koristite ovaj alat za generiranje testnih podataka s lažnim (fake) podacima na hrvatskom jeziku.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajMacke}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj Macaka</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojMacaka}
                                onChange={(e) => setBrojMacaka(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj Macaka (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj Macke'}
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <Form onSubmit={handleGenerirajMackoljupce}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj mackoljubaca</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={BrojMackoljubaca}
                                onChange={(e) => setBrojMackoljubaca(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj mackoljubaca (1-200)
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj mackoljupce'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće. 
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Koristite ove opcije za brisanje svih podataka iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiMacke}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve Macke'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button 
                        variant="danger" 
                        onClick={handleObrisiMackoljupce}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve mackoljupce'}
                    </Button>
                </Col>
                <Col md={4}>
                    
                </Col>
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}
