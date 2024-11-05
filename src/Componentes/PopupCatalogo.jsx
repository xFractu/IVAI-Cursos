import { useState } from "react";
import { CardHeader, Grid, Typography, CardContent, TextField, CardActionArea, Button } from "@mui/material";
import axios from "axios";
import X from '../assets/cerrar.svg'
import PopupMSJBien from './PopupMSJBien.jsx';
import ConfirmIcon from '../assets/check.svg';
import ErrorIcon from '../assets/error.svg';

function PopupCatalogo({ onClose, reloadCursos }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const [dataTipoCurso, setDataTipoCurso] = useState({
        tipo: ''
    });
    
    const [dataError, setDataError] = useState({
        titulo: '',
        mensaje: ''
    })

    const agregarTipoCursos = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/registroTipoCurso", dataTipoCurso);
            if (respuesta.status === 200 && respuesta.data == "Tipo de Curso registrado") {
                setDataError({
                    titulo: 'Tipo de Curso registrado',
                    mensaje: 'El tipo de curso se ha registrado correctamente'
                });
                setIsError(false);
                setIsPopupOpen(true);
                reloadCursos();
            } else if (respuesta.status === 200 && respuesta.data == "Error al registrar el tipo de curso")
                console.log("Error al registrar")
        } catch (error) {
            console.error('Error al registrar el curso:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataTipoCurso({ ...dataTipoCurso, [name]: value });
    };

    return (
        <>
            <div className='layout_agregar_curso'>
                <header className="header_agregar_curso">
                    <CardHeader
                        sx={{ color: '#FFFFFF', width: '100%', marginLeft: -5 }}
                        title={
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <Grid item>

                                </Grid>
                                <Grid item>

                                </Grid>
                                <Grid item sx={{ alignItems: 'start', marginLeft: -20 }}>
                                    <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto' }}>
                                        Agregar Tipo de Curso
                                    </Typography>
                                </Grid>

                                <Grid item>

                                    <img
                                        src={X}
                                        alt="Web"
                                        className='IconoSalir'
                                        onClick={onClose}
                                    />
                                </Grid>

                            </Grid>
                        }
                    />

                </header>
                <main className="main_agregar_tipo_curso">
                    <div>
                        <CardContent sx={{ color: '#FFFFFF' }}>
                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2' sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Nombre del Tipo de Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant='outlined' size='small' name='tipo'
                                        onChange={handleInputChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', width: '22vw',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActionArea sx={{ textAlign: 'center' }}>
                            <Button variant="contained" onClick={agregarTipoCursos} sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw', width: '10vw' }}>Agregar</Button>
                        </CardActionArea>
                    </div>
                </main>
            </div>
            {isPopupOpen && (
                <div className="popup-overlay-confirmation-registro">
                    <div className={`popup-confirmation-registro ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupMSJBien
                            icon={isError ? ErrorIcon : ConfirmIcon}
                            title={dataError.titulo}
                            message={dataError.mensaje}
                            buttonText="Cerrar"
                            onClose={onClose}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default PopupCatalogo;