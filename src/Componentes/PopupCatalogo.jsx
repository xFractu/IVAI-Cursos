import { useState } from "react";
import { CardHeader, Grid, Typography, CardContent, TextField, CardActionArea, Button } from "@mui/material";
import X from '../assets/cerrar.svg'

function PopupCatalogo({ onClose }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataTipoCurso, setDataTipoCurso] = useState({
        nombre: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataCurso({ ...dataTipoCurso, [name]: value });
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
                                    <TextField fullWidth variant='outlined' size='small' name='nombreCurso'
                                        onChange={handleInputChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActionArea sx={{ textAlign:'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw', width:'10vw' }}>Agregar</Button>
                        </CardActionArea>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PopupCatalogo;