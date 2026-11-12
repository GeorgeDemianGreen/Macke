import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import MackaService from "../../services/macke/MackaService";
import { useState, useRef } from "react";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ShemaMacka } from "../../schemas/ShemaMacka";

export default function MackaNovi() {

    const navigate = useNavigate()
    const [slikaZaCrop, setSlikaZaCrop] = useState(null);
    const cropperRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    async function dodaj(macka) {
        await MackaService.dodaj(macka).then(() => {
            navigate(RouteNames.MACKE)
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
        const rezultat = ShemaMacka.safeParse(objektPodataka);

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
            naziv: podaci.get('naziv'),
            debljina: parseInt(podaci.get('debljina')),
            boja: podaci.get('boja'),
            dlaka: podaci.get('dlaka'),
            mazna: podaci.get('mazna'),
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
                Dodavanje nove mačke
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text"
                        placeholder="Unesite naziv macke"
                        className="granica"
                        name="naziv"
                        isInvalid={!!errors.naziv}
                        onFocus={() => handleFocus('naziv')} // Pozivamo novu funkciju
                        onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.naziv}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="debljina">
                    <Form.Label>Debljina</Form.Label>
                    <Form.Control type="number"
                        name="debljina" step={1}
                        placeholder="0"
                        isInvalid={!!errors.debljina}
                        onFocus={() => ocistiGresku('debljina')}
                        onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.debljina}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="boja">
                    <Form.Label>Boja</Form.Label>
                    <Form.Control type="text"
                        name="dlaka"
                        placeholder="0,00"
                        step={0.01}
                        isInvalid={!!errors.dlaka}
                        onFocus={() => ocistiGresku('dlaka')}
                        onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.dlaka}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="dlaka">
                    <Form.Label>Dlaka</Form.Label>
                    <Form.Control type="text"
                        name="boja"
                        placeholder="0,00"
                        step={0.01}
                        isInvalid={!!errors.boja}
                        onFocus={() => ocistiGresku('boja')}
                        onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.boja}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="mazna">
                    <Form.Label>Mazna</Form.Label>
                    <Form.Control type="text"
                        name="mazna"
                        placeholder="0,00"
                        step={0.01}
                        isInvalid={!!errors.mazna}
                        onFocus={() => ocistiGresku('mazna')}
                        onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.mazna}
                    </Form.Control.Feedback>

                </Form.Group>




                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.MACKE}
                            className="btn btn-danger pozadina">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success" className="pozadina">
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