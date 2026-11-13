import { useEffect, useState } from 'react';
import slika from '../assets/cat.png';
import { IME_APLIKACIJE } from '../constants';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LordIcon } from '@lordicon/react';
import MackaService from '../services/macke/MackaService';
import MackoljupciService from '../services/mackoljupci/MackoljupciService';

export default function Home() {
  const [brojMacaka, setBrojMacaka] = useState(12);
  const [brojMackoljubaca, setBrojMackoljubaca] = useState(8);
  const [animatedMacke, setAnimatedMacke] = useState(0);
  const [animatedMackoljupci, setAnimatedMackoljupci] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mackeRezultat = await MackaService.get();
        const mackoljupci = await MackoljupciService.get();

        setBrojMacaka(mackeRezultat.data.length);
        setBrojMackoljubaca(mackoljupci.data.length);
      } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (animatedMacke < brojMacaka) {
      const timer = setTimeout(() => {
        setAnimatedMacke((prev) => Math.min(prev + 1, brojMacaka));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [animatedMacke, brojMacaka]);

  useEffect(() => {
    if (animatedMackoljupci < brojMackoljubaca) {
      const timer = setTimeout(() => {
        setAnimatedMackoljupci((prev) => Math.min(prev + 1, brojMackoljubaca));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animatedMackoljupci, brojMackoljubaca]);

  return (
    <Container>
      <Row className="align-items-center">
        {/* LIJEVA STRANA */}
        <Col md={6}>
          <div style={{ textAlign: 'left' }}>
            <img src={slika} alt="Mačka" />
          </div>

          <p className="lead mt-5 text-start">Dobrodošli na {IME_APLIKACIJE}</p>
        </Col>

        {/* DESNA STRANA */}
        <Col md={6}>
          <div className="d-flex flex-column align-items-end" style={{ width: '100%', gap: '30px' }}>
            {/* LORDICONS - GORE DESNO */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                <Card.Body className="text-center">
                  <p className="text-black">Mačke</p>

                  <div className="statistikaTekst">
                    <LordIcon src="/lordicon/manekineko.json" trigger="hover" />
                    {animatedMacke}
                    <LordIcon src="/lordicon/manekineko.json" trigger="hover" />
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                <Card.Body className="text-center">
                  <p className="text-black">Mačkoljupci</p>

                  <div className="statistikaTekst">
                    <LordIcon style={{ width: 80, height: 80 }} src="/lordicon/polaznik.json" trigger="hover" />
                    {animatedMackoljupci}
                    <LordIcon style={{ width: 80, height: 80 }} src="/lordicon/polaznik.json" trigger="hover" />
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* LOTTIE - DOLJE DESNO */}
            <div style={{ width: '100%', maxWidth: '400px', height: '300px' }}>
              <DotLottieReact
                src="/lordicon/catfishing.lottie"
                loop
                autoplay
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
