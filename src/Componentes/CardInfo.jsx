import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import PopupRegistro from '../Componentes/PopupRegistro'
import '../Estilos/CardInfo.css';
import check from '../Imagenes/cursos.png';


function CardInfo(Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);

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
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300); // Duración de la animación de salida
        }
    };

    return (
        <>
            <div className="Card-Info-Cursos"> 
            <Card className ='Card-Contenedor' variant="elevation" sx={{ maxWidth: '100%', maxHeight: '60%', backgroundColor: '#A35494',paddingLeft: '0vw',marginBottom: '2vw', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <CardContent className ='Card-Contenido' sx={{ color: '#FFFFFF', marginLeft: 1, marginTop: 1 }}>
                <div className="Card-Container">
                <div className="Card-Content">
                    <label className="Card-Titulo">{Props.NombreCurso}</label><br/>
                    <div className="Info-Card">
                        <label className="Card-text" variant="body2">Persona que imparte el curso: {Props.ExpositorCurso}</label>
                        <label className="Card-text" variant="body2">Modalidad: {Props.ModalidadCurso}</label>
                        <label className="Card-text" variant="body2">Fecha: {Props.FechaCurso}</label>
                        <label className="Card-text" variant="body2">Hora: {Props.HoraCurso}</label>
                    </div>
                    <CardActions className="Card-Actions">
                    <button className ='Boton-Card' onClick={handleOpenPopup} variant="contained">
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
                            <PopupRegistro onClose={handleClosePopup} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CardInfo;




