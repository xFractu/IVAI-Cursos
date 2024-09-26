import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from 'react';
import PopupModificarCurso from "../Componentes/PopupModificarCurso.jsx";


function CardModificar(Props) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }

    return (
        <>
            <Card variant="elevation" sx={{ maxWidth:'90%', maxHeight: '60%', backgroundColor: '#FFFFF', margin:5, alignItems:'center',justifyContent:'center', borderRadius:5 }}>
                <CardHeader sx={{ color: '#A35494', marginLeft:2 }} title={Props.NombreCurso} />
                <CardContent sx={{ color: '#A35494', marginLeft: 2, marginTop:-3}}>
                    <Typography variant="body2">Persona que imparte el curso : {Props.ExpositorCurso}</Typography>
                    <Typography variant="body2">Lugar: {Props.LugarCurso}</Typography>
                    <Typography variant="body2">Fecha: {Props.FechaCurso}</Typography>
                    <Typography variant="body2">Hora: {Props.HoraCurso}</Typography>
                </CardContent>

                

                <CardActions>
                    <Button onClick={handleOpenPopup} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E",marginTop:-2, marginLeft:3, marginBottom:3 }}>Modificar</Button>
                </CardActions>

            </Card>

            {isPopupOpen && (
                <div className="popup-overlay-inicio" >
                    <div className="popup">
                        <PopupModificarCurso onClose={handleClosePopup}/>
                    </div>
                </div>
            )}

        </>
    )
}
export default CardModificar;