import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import PopupRegistro from '../Componentes/PopupRegistro'
import '../Estilos/CardInfo.css';
import PopupMSJBien from './PopupMSJBien.jsx'
import ConfirmIcon from '../assets/check.svg';
import ErrorIcon from '../assets/error.svg';

function CardInfo(Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenMsj, setIsPopupOpenMsj] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [dataError, setDataError] = useState({
   titulo: '',
   mensaje: '',
});

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = "hidden";
        setScrollEnabled(false);
    };

    const handleClosePopup = () => {
        const popup = document.querySelector('.popup-content-compo-1');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
                Props.reloadCursos();
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300); // Duración de la animación de salida
        }
    };

    const handleOpenPopupMsj  = (errorData, errorStatus) => {
        setDataError(errorData);
        setIsError(errorStatus);
        setIsPopupOpenMsj(true);
        document.body.style.overflow = "hidden";
        setScrollEnabled(false);
    };

    const handleClosePopupMsj = () => {
        const popup = document.querySelector('.popup-content-msj');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpenMsj(false);
                Props.reloadCursos()
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300); // Duración de la animación de salida
        }
    };


    function obtenerColorCupo(cupoDisponible, cupoTotal) {
        const porcentaje = (cupoDisponible / cupoTotal) * 100;
      
        if (cupoDisponible === 0) {
          return 'red';
        } else if (porcentaje <= 50) {
          return 'orange';
        } else {
          return '#35ce00'; 
        }
      }

      

    return (
        <>
            <div className="Card-Info-Cursos">
                <Card className='Card-Contenedor' variant="elevation" sx={{ maxWidth: '100%', maxHeight: '60%', backgroundColor: '#A35494', paddingLeft: '0vw', marginBottom: '2vw', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                    <CardContent className='Card-Contenido' sx={{ color: '#FFFFFF', marginLeft: 1, marginTop: 1 }}>
                        <div className="Card-Container">
                            <div className="Card-Content">
                                <label className="Card-Lugares" id="cupoDisponible">Cupos:<p id="numeroCupoDisponible" style={{ backgroundColor: obtenerColorCupo(Props.CupoDisponible, Props.Cupo) }}>{Props.CupoDisponible}</p></label>
                                <label className="Card-Titulo">{Props.NombreCurso}</label><br />
                                <div className="Info-Card">
                                    <label className="Card-text" variant="body2">Persona que imparte el curso: {Props.ExpositorCurso}</label>
                                    <label className="Card-text" variant="body2">Modalidad: {Props.ModalidadCurso}</label>
                                    <label className="Card-text" variant="body2">Fecha: {Props.FechaCurso}</label>
                                    <label className="Card-text" variant="body2">Hora: {Props.HoraCurso}</label>
                                </div>
                                <CardActions className="Card-Actions">
                                    <button className='Boton-Card' onClick={handleOpenPopup} variant="contained">
                                        Ver Disponibilidad
                                    </button>
                                </CardActions>

                            </div>


                        </div>
                    </CardContent>

                </Card>
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className={`popup-content-compo-1 ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <div className= "pupup-responsive">
                            <PopupRegistro 
                                onClose={handleClosePopup}
                                onOpenPopupMsj={(errorData, errorStatus) => handleOpenPopupMsj(errorData, errorStatus)}
                                cupo = {Props.CupoDisponible}
                                onReload={Props.reloadCursos}
                            />
                            
                        </div>
                    </div>
                </div>
            )}

            {isPopupOpenMsj && (
                <div className="popup-overlay">
                    <div className={`popup-content-msj ${isPopupOpenMsj ? 'popup-show' : 'popup-hide'}`}>
                            <PopupMSJBien
                                icon={isError ? ErrorIcon : ConfirmIcon}
                                title={dataError.titulo}
                                message={dataError.mensaje}
                                buttonText="Cerrar"
                                onClose={handleClosePopupMsj}
                                onClosePrev={handleClosePopup}
                            />
                    </div>
                </div>
            )}

        </>
    )
}

export default CardInfo;




