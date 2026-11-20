import { useEffect, useState } from 'react';
import slika from '../assets/cat.png';
import { IME_APLIKACIJE } from '../constants';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LordIcon } from '@lordicon/react';
import MackaService from '../services/macke/MackaService';
import MackoljupciService from '../services/mackoljupci/MackoljupciService';
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

export default function Home() {
  const [brojMacaka, setBrojMacaka] = useState(12);
  const [brojMackoljubaca, setBrojMackoljubaca] = useState(8);
  const [animatedMacke, setAnimatedMacke] = useState(0);
  const [animatedMackoljupci, setAnimatedMackoljupci] = useState(0);

  const [podaci, setPodaci] = useState([]);
  const [prikaziGraf, setPrikaziGraf] = useState(false)


  async function getPodaci() {
    const odgovor = await MackaService.get();
    const zaGraf = odgovor.data.map((m) => {
      return {
        y: m.brojGlasova,
        name: m.naziv,
      };
    })
    setPodaci(zaGraf);
  }

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
    getPodaci()
    fetchData();
  }, []);

  useEffect(() => {
    if (animatedMacke < brojMacaka) {
      const timer = setTimeout(() => {
        setAnimatedMacke((prev) => Math.min(prev + 1, brojMacaka));
      }, 100);

      return () => clearTimeout(timer);
    }else{
      setPrikaziGraf(true)
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


  const fixedOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Popularnost mačaka',
      align: 'left',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      enabled: false,
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>',
        },
      },
    },
  };

  const boje = [
    '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
    '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4'
];

  return (
    <Container>
      <Row>
        {/* LIJEVA STRANA */}
        <Col md={4}>
          <div style={{ textAlign: 'left' }}>
            <img src={slika} alt="Mačka" style={{ width: '100%' }} />
          </div>

          <p className="lead mt-5 text-start">Dobrodošli na {IME_APLIKACIJE}</p>
        </Col>

        <Col md={4}>
          {prikaziGraf && podaci.length > 0 && (
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...fixedOptions,
                chart: {
                  ...fixedOptions?.chart,
                  backgroundColor: '#faaed1', 
                },
                series: [
                  {
                    name: 'Polaznici',
                    colorByPoint: true,
                    data: podaci.map((stavka, indeks) => ({
                    ...stavka,
                    color: boje[indeks % boje.length], // dodjeljuje boju po indeksu
                })),
                  },
                ],
              }}
            />
          )}
        </Col>

        {/* DESNA STRANA */}
        <Col md={4}>
          <div className="d-flex flex-column align-items-end" style={{ width: '100%', gap: '30px', paddingTop: '1.5rem' }}>
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
