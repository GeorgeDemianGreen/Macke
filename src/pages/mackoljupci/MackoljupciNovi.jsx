import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackoljupciService from "../../services/mackoljupci/MackoljupciService";
import { useEffect, useRef, useState } from "react";
import MackaService from "../../services/macke/MackaService";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ShemaMackoljupci } from "../../schemas/ShemaMackoljupci";


export default function MackoljupciNovi() {

    const navigate = useNavigate()
    const [macke, setMacke] = useState([])
    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    async function ucitajMacke() {
        await MackaService.get().then((res) => {
            setMacke(res.data)
        })
    }

    useEffect(() => {
        ucitajMacke()
    }, [])


    async function dodaj(mackoljupce) {
        await MackoljupciService.dodaj(mackoljupce).then(() => {
            navigate(RouteNames.MACKOLJUPCI)
        })
    }

       function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        if (!files || !files.length) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSlikaZaCrop(reader.result);
        };

        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }


    function obradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        const objektPodataka = Object.fromEntries(podaci);
        const rezultat = ShemaMackoljupci.safeParse(objektPodataka);

     let dataUrl = null
        if (cropperRef.current && cropperRef.current.cropper && cropperRef.current.cropper.cropped) {
            const cropper = cropperRef.current.cropper;
            const selectionData = cropper.getData();
            const actualWidth = selectionData.width;
            const actualHeight = selectionData.height;
            const targetSize = 400;
            const canvasWidth = actualWidth > targetSize ? targetSize : actualWidth;
            const canvasHeight = actualHeight > targetSize ? targetSize : actualHeight;
            const canvas = cropper.getCroppedCanvas({
                width: canvasWidth,
                height: canvasHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            });
            dataUrl = canvas.toDataURL('image/png');
        }

        if (!rezultat.success) {
            const noveGreske = {};
            rezultat.error.issues.forEach((greska) => {
                noveGreske[greska.path[0]] = greska.message;
            });
            setErrors(noveGreske);
            return;
        }

        dodaj({
            //slika: podaci.get('slika'), // u jednom od sljedećih koraka
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            omiljenamacka: parseInt(podaci.get('omiljenamacka')),
            slika: dataUrl

        })
    }

      const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };


         const handleFocus = (nazivPolja) => {
        ocistiGresku(nazivPolja);
        if (isChecking) setIsChecking(true)
    };

         const handleBlur = () => {
        if (isChecking) setIsChecking(false);
    };


    return (
        <>
            <h3>
                Dodavanje novog mačkoljupca
            </h3>

            <Form onSubmit={obradiSubmit}>


                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" 
                     placeholder="Unesite ime"
                                    className="granica"
                                    name="ime"
                                    isInvalid={!!errors.ime}
                                        onFocus={() => handleFocus('ime')} // Pozivamo novu funkciju
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ime}
                                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text"
                    placeholder="Unesite prezime"
                                    className="granica"
                                    name="prezime"
                                    isInvalid={!!errors.prezime}
                                        onFocus={() => handleFocus('prezime')} // Pozivamo novu funkciju
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.prezime}
                                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="omiljenamacka">
                    <Form.Label>Omiljena mačka</Form.Label>
                    <Form.Select name="omiljenamacka" required>
                        <option value="" key={0}>Odabir omiljene mačke</option>
                        {macke && macke.map((s) => (
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
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>

                <Col lg={6}>
                <input className='mb-3' type='file' onChange={onChangeImage} />
                <Cropper
                    src={slikaZaCrop}
                    style={{ height: 400, width: '100%' }}
                    initialAspectRatio={1}
                    guides={true}
                    autoCropArea={1}
                    viewMode={1}
                    minCropBoxWidth={400}
                    minCropBoxHeight={400}
                    cropBoxResizable={false}
                    background={false}
                    responsive={true}
                    checkOrientation={false}
                    ref={cropperRef}
                />
            </Col>

        </>
    )
}