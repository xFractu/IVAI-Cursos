import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import PopupRegistro from '../Componentes/PopupRegistro'

function CardInfo(Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const handleOpenPopup = () => {
      setIsPopupOpen(true);
      document.body.style.overflow = "hidden";
      setScrollEnabled(false);
      setTimeout(() => {
        setIsAnimating(true); 
      }, 0);
    };

    const handleClosePopup = () => {
      setIsAnimating(false); 
      document.body.style.overflow = "auto";
    setScrollEnabled(true);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 300); 
    };
    return (
        <>
            <Card variant="elevation" sx={{ maxWidth: '90%', maxHeight: '60%', backgroundColor: '#A35494', margin: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <CardHeader sx={{ color: '#FFFFFF', marginLeft: 2 }} title={Props.NombreCurso} />
                <CardContent sx={{ color: '#FFFFFF', marginLeft: 2, marginTop: -3 }}>
                    <Typography variant="body2">Persona que imparte el curso : {Props.ExpositorCurso}</Typography>
                    <Typography variant="body2">Lugar: {Props.LugarCurso}</Typography>
                    <Typography variant="body2">Fecha: {Props.FechaCurso}</Typography>
                    <Typography variant="body2">Hora: {Props.HoraCurso}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleOpenPopup} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: -2, marginLeft: 3, marginBottom: 3 }}>
                        VerDisponibilidad
                    </Button>
                </CardActions>
            </Card>

            {isPopupOpen && (
              <div className="popup-overlay">
                <div className={`popup-content ${isAnimating ? 'open' : 'close'}`}>
                    <PopupRegistro onClose={handleClosePopup} />
                </div>
              </div>
            )}

        </>
    )
}
export default CardInfo;
