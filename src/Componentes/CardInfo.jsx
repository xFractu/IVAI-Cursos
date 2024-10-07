import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import PopupRegistro from '../Componentes/PopupRegistro'
import '../Estilos/CardInfo.css';


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
            <Card className ='Card-Contenedor' variant="elevation" sx={{ maxWidth: '90%', maxHeight: '60%', backgroundColor: '#A35494', marginLeft: '2vw',marginBottom: '2vw', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <CardContent className ='Card-Contenido' sx={{ color: '#FFFFFF', marginLeft: 1, marginTop: -2 }}>
                <Typography className ='Card-Titulo' variant="body2" sx ={{ fontSize:'1.5vw', fontWeight:'bold', paddingTop:'2vw', paddingBottom:'1vw'}}>{Props.NombreCurso}</Typography>
                    <Typography className ='Card-text' variant="body2" sx ={{ fontSize:'1vw'}}>Persona que imparte el curso : {Props.ExpositorCurso}</Typography>
                    <Typography className ='Card-text' variant="body2" sx ={{ fontSize:'1vw'}}>Lugar: {Props.LugarCurso}</Typography>
                    <Typography className ='Card-text' variant="body2" sx ={{ fontSize:'1vw'}}>Fecha: {Props.FechaCurso}</Typography>
                    <Typography className ='Card-text' variant="body2" sx ={{ fontSize:'1vw', fontStyle:''}}>Hora: {Props.HoraCurso}</Typography>
                </CardContent>
                <CardActions>
                    <Button className ='Boton-Card' onClick={handleOpenPopup} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: -2, marginLeft: 2, marginBottom: 1.5, fontSize:'.8vw' }}>
                        Ver Disponibilidad
                    </Button>
                </CardActions>
            </Card>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className={`popup-content-compo-1 ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupRegistro onClose={handleClosePopup} />
                    </div>
                </div>
            )}
        </>
    )
}

export default CardInfo;




