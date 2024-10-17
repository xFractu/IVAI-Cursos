import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from 'react';
import  axios from 'axios';
import PopupModificarCurso from "../Componentes/PopupModificarCurso.jsx";


function CardModificar(Props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        const popup = document.querySelector('.popup-content-compo-1');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
                Props.reloadCursos();
            }, 300); 
        }
    };

    const obtenerRegistros = async (idCurso) => {
        try {
            const response = await fetch(`http://localhost:4567/obtenerExcelRegistros/${idCurso}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `registros_curso_${idCurso}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <>
            <Card variant="elevation" sx={{ maxWidth:'90%', maxHeight: '60%', backgroundColor: '#FFFFF', margin:5, alignItems:'center',justifyContent:'center', borderRadius:5 }}>

                <CardHeader sx={{ color: '#A35494', marginLeft: 2 }} title={Props.NombreCurso} titleTypographyProps={{ fontSize:'3.5vh', fontStyle:'Bold'}}/>
                <CardContent sx={{ color: '#A35494', marginLeft: 2, marginTop: -3 }}>
                    <Typography variant="body2" sx ={{ fontSize:'2.5vh'}}>Persona que imparte el curso : {Props.ExpositorCurso}</Typography>
                    <Typography variant="body2" sx ={{ fontSize:'2.5vh'}}>Modalidad: {Props.ModalidadCurso}</Typography>
                    <Typography variant="body2" sx ={{ fontSize:'2.5vh'}}>Fecha: {Props.FechaCurso}</Typography>
                    <Typography variant="body2" sx ={{ fontSize:'2.5vh'}}>Hora: {Props.HoraCurso}</Typography>
                </CardContent>

                <CardActions>
                    <Button onClick={handleOpenPopup} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E",marginTop:-2, marginLeft:3, marginBottom:3, fontSize:'2vh'  }}>Modificar</Button>
                    <Button onClick={() => obtenerRegistros(Props.IdCurso)} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E",marginTop:-2, marginLeft:3, marginBottom:3, fontSize:'2vh'  }}>Descargar Archivo</Button>
                </CardActions>
            </Card>

            {isPopupOpen && (
                <div className="popup-overlay-compo-1">
                     <div className={`popup-content-compo-1 ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupModificarCurso 
                            onClose={handleClosePopup}
                            nombreCurso={Props.NombreCurso}
                            fecha={Props.FechaCurso} 
                            hora={Props.HoraCurso}
                            modalidad={Props.ModalidadCurso}
                            direccion={Props.DireccionCurso}
                            imparte={Props.ExpositorCurso}
                            estatusCupo={Props.EstatusCupo}
                            estatusCurso={Props.EstatusCurso}
                            tipoCurso={Props.TipoCurso}
                            curso={Props.Curso}
                            valorCurricular={Props.ValorCurricular}
                            ligaTeams={Props.LigaTeams}
                            reloadCursos={Props.reloadCursos} 
                        />
                    </div>
                </div>
            )}
        </>
    )
}
export default CardModificar;